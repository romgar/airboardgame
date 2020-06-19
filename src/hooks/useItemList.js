import React from "react";
import { useC2C } from "./useC2C";
import {
  atom,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from "recoil";
import { selectedItemsAtom } from "../components/Selector";
import { shuffle as shuffleArray } from "../utils";
import { nanoid } from "nanoid";

const ItemListAtom = atom({
  key: "itemList",
  default: [],
});

export const ItemsSubscription = () => {
  const [c2c] = useC2C();
  const setItemList = useSetRecoilState(ItemListAtom);

  React.useEffect(() => {
    const unsub = c2c.subscribe(`selectedItemsMove`, ({ itemIds, move }) => {
      setItemList((prevList) => {
        return prevList.map((item) => {
          if (itemIds.includes(item.id)) {
            const x = item.x + move.x;
            const y = item.y + move.y;
            const newItem = { ...item, x, y };
            return newItem;
          }
          return item;
        });
      });
    });
    return unsub;
  }, [c2c, setItemList]);

  React.useEffect(() => {
    const unsub = c2c.subscribe(`updateItemListOrder`, (itemIds) => {
      setItemList((prevList) => {
        const itemsMap = prevList.reduce((prev, item) => {
          prev[item.id] = item;
          return prev;
        }, {});
        const result = prevList.map((item, index) => {
          return itemsMap[itemIds[index]];
        });
        return result;
      });
    });
    return unsub;
  }, [c2c, setItemList]);

  return null;
};

const useItemsAction = () => {
  const [c2c] = useC2C();
  const [itemList, setItemList] = useRecoilState(ItemListAtom);
  const selectedItems = useRecoilValue(selectedItemsAtom);

  const updateItem = React.useCallback(
    (id, callbackOrItem, sync = true) => {
      let callback = callbackOrItem;
      if (typeof callbackOrItem === "object") {
        callback = () => callbackOrItem;
      }
      setItemList((prevList) => {
        return prevList.map((item) => {
          if (item.id === id) {
            const newItem = {
              ...callback(item),
              id: item.id, // Prevent id modification
            };
            if (sync) {
              c2c.publish(`itemStateUpdate.${newItem.id}`, newItem);
            }
            return newItem;
          }
          return item;
        });
      });
    },
    [setItemList, c2c]
  );

  const moveSelectedItems = React.useCallback(
    (itemId, posDelta) => {
      let ids = [itemId];
      if (selectedItems.includes(itemId)) {
        ids = selectedItems;
      }
      setItemList((prevList) => {
        const newItemList = prevList.map((item) => {
          if (ids.includes(item.id)) {
            const x = item.x + posDelta.x;
            const y = item.y + posDelta.y;
            const newItem = { ...item, x, y };
            return newItem;
          }
          return item;
        });
        c2c.publish(`selectedItemsMove`, {
          itemIds: ids,
          move: posDelta,
        });
        return newItemList;
      });
    },
    [setItemList, selectedItems, c2c]
  );

  const batchUpdateItems = React.useCallback(
    (ids, callbackOrItem) => {
      let callback = callbackOrItem;
      if (typeof callbackOrItem === "object") {
        callback = () => callbackOrItem;
      }
      setItemList((prevList) => {
        return prevList.map((item) => {
          if (ids.includes(item.id)) {
            const newItem = {
              ...callback(item),
              id: item.id,
            };
            c2c.publish(`itemStateUpdate.${item.id}`, newItem);
            return newItem;
          }
          return item;
        });
      });
    },
    [c2c, setItemList]
  );

  const putItemOnTop = React.useCallback(
    (itemIdToMove) => {
      setItemList((prevItemList) => {
        const itemToMove = prevItemList.find(({ id }) => itemIdToMove === id);
        const result = prevItemList.filter(({ id }) => itemIdToMove !== id);
        result.push(itemToMove);
        c2c.publish(
          `updateItemListOrder`,
          result.map(({ id }) => id)
        );
        return result;
      });
    },
    [setItemList, c2c]
  );

  // Shuffle selection
  const shuffleSelectedItems = React.useCallback(() => {
    setItemList((prevItemList) => {
      const shuffledSelectedItems = shuffleArray(
        prevItemList.filter(({ id }) => selectedItems.includes(id))
      );

      const result = prevItemList.map((item) => {
        if (selectedItems.includes(item.id)) {
          const newItem = {
            ...shuffledSelectedItems.pop(),
            x: item.x,
            y: item.y,
          };
          c2c.publish(`itemStateUpdate.${newItem.id}`, newItem);
          return newItem;
        }
        return item;
      });

      c2c.publish(
        `updateItemListOrder`,
        result.map(({ id }) => id)
      );
      return result;
    });
  }, [c2c, setItemList, selectedItems]);

  const pushItem = (newItem) => {
    setItemList((prevItemList) => [
      ...prevItemList,
      {
        ...newItem,
        x: 200,
        y: 50,
        id: nanoid(),
      },
    ]);
  };

  return {
    itemList,
    putItemOnTop,
    batchUpdateItems,
    moveSelectedItems,
    updateItem,
    shuffleSelectedItems,
    setItemList,
    pushItem,
  };
};

export default useItemsAction;