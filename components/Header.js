import { useState } from 'react';
import { useTransition, animated } from 'react-spring';

export default function Header() {
  const [toggle, set] = useState(false);

  const transitions = useTransition(toggle, null, {
    from: { position: 'absolute', opacity: 0, top: '-100px' },
    enter: { opacity: 1, top: '40px' },
    leave: { opacity: 0, top: '-100px' }
  });

  function handleClick() {
    set(!toggle);
  }

  return (
    <header className="m0a pb40 pt40 w90 w80-d">
      {transitions.map(({ item, key, props }) =>
        item ? (
          <animated.img
            key={key}
            style={props}
            src="/static/1f311.svg"
            className="celestial"
            alt="sun"
            onClick={handleClick}
          />
        ) : (
          <animated.img
            key={key}
            style={props}
            src="/static/2600.svg"
            className="celestial"
            alt="new moon"
            onClick={handleClick}
          />
        )
      )}
    </header>
  );
}
