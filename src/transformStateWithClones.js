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
        updatedState = {};

        for (const key in currentState) {
          if (!action.keysToRemove.includes(key)) {
            updatedState[key] = currentState[key];
          }
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    currentState = updatedState;
    stateHistory.push(currentState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
