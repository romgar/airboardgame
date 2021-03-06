import React from "react";

import { useC2C } from "../hooks/useC2C";

import { useItems } from "../components/Board/Items";

export const SubscribeGameEvents = ({
  availableItemList,
  setAvailableItemList,
  boardConfig,
  setBoardConfig,
}) => {
  const [c2c, joined, isMaster] = useC2C();
  const { itemList, setItemList } = useItems();
  const [gameLoaded, setGameLoaded] = React.useState(false);
  const gameLoadingRef = React.useRef(false);

  const gameRef = React.useRef({
    items: itemList,
    board: boardConfig,
    availableItems: availableItemList,
  });

  gameRef.current = {
    items: itemList,
    board: boardConfig,
    availableItem: availableItemList,
  };

  React.useEffect(() => {
    const unsub = [];
    if (joined && isMaster) {
      console.log("Register");
      c2c
        .register("getGame", () => {
          console.log("Send this game", gameRef.current);
          return gameRef.current;
        })
        .then((unregister) => {
          unsub.push(unregister);
        });
    }
    return () => {
      unsub.forEach((u) => u());
    };
  }, [c2c, isMaster, joined]);

  React.useEffect(() => {
    const unsub = [];
    unsub.push(
      c2c.subscribe("loadGame", (game) => {
        console.log("Loadgame", game);
        setAvailableItemList(game.availableItems);
        setItemList(game.items);
        setBoardConfig(game.board);
      })
    );
    return () => {
      unsub.forEach((u) => u());
    };
  }, [c2c, setAvailableItemList, setItemList, setBoardConfig]);

  // Load game from master if any
  React.useEffect(() => {
    if (!gameLoaded && joined && !isMaster && !gameLoadingRef.current) {
      gameLoadingRef.current = true;
      c2c.call("getGame").then(
        (game) => {
          setGameLoaded(true);
          setAvailableItemList(game.availableItems);
          setItemList(game.items);
          setBoardConfig(game.board);
        },
        () => {}
      );
    }
  }, [
    c2c,
    isMaster,
    joined,
    setAvailableItemList,
    setItemList,
    setBoardConfig,
    gameLoaded,
  ]);
  return null;
};

export default SubscribeGameEvents;
