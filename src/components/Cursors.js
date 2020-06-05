import React from 'react';
import { useC2C } from '../hooks/useC2C';
import Cursor from './Cursor';

export const Cursors = ({ users }) => {
  const [c2c, joined] = useC2C();
  const [cursors, setCursors] = React.useState({});

  const colors = React.useMemo(() => {
    return users.reduce((acc, user) => {
      acc[user.id] = user.color;
      return acc;
    }, {});
  }, [users]);

  React.useEffect(() => {
    setCursors((prevCursors) => {
      return users.reduce((acc, user) => {
        if (prevCursors[user.id]) {
          acc[user.id] = prevCursors[user.id];
        }
        return acc;
      }, {});
    });
  }, [users]);

  React.useEffect(() => {
    c2c.subscribe('cursorMove', ({ userId, pos }) => {
      //console.log('move', pos);
      setCursors((prevCursors) => {
        return {
          ...prevCursors,
          [userId]: pos,
        };
      });
    });
    c2c.subscribe('cursorOff', ({ userId }) => {
      //console.log('move', pos);
      setCursors((prevCursors) => {
        const newCursors = {
          ...prevCursors,
        };
        delete newCursors[userId];
        return newCursors;
      });
    });
  }, [c2c]);

  return (
    <div>
      {Object.entries(cursors).map(([userId, pos]) => (
        <Cursor
          color='#F11'
          key={userId}
          pos={pos}
          text={userId}
          color={colors[userId]}
        />
      ))}
    </div>
  );
};

export default Cursors;
