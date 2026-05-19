const REACT_VERSION = '18.2.0';
const ZUSTAND_VERSION = '5.0.13';

function getShared({ eager = false } = {}) {
  const reactShared = {
    singleton: true,
    strictVersion: true,
    requiredVersion: REACT_VERSION,
  };

  const zustandShared = {
    singleton: true,
    strictVersion: true,
    requiredVersion: ZUSTAND_VERSION,
  };

  const shared = {
    react: { ...reactShared },
    'react-dom': { ...reactShared },
    'react/jsx-runtime': { ...reactShared },
    'react/jsx-dev-runtime': { ...reactShared },
    zustand: { ...zustandShared },
    '@repo/cart-store': {
      singleton: true,
      strictVersion: false,
    },
  };

  if (eager) {
    Object.keys(shared).forEach((key) => {
      shared[key].eager = true;
    });
  }

  return shared;
}

module.exports = { getShared, REACT_VERSION };
