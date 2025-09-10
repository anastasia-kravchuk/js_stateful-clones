'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    let updatedState;

    switch (action.type) {
      case 'clear':
        updatedState = {};
        break;

      case 'addProperties':
        updatedState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        updatedState = { ...currentState };

        const keysToRemove = action.keysToRemove;

        if (Array.isArray(keysToRemove)) {
          for (const key of keysToRemove) {
            if (Object.prototype.hasOwnProperty.call(updatedState, key)) {
              delete updatedState[key];
            }
          }
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    currentState = updatedState;
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
