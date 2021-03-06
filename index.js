console.clear();

// People dropping off a form (Action Creator)
const createPolicy = () => {
  return { // Action (a form in our analogy)
    type: "CREATE_POLICY",
    payload: {
      name: name,
      amount: amount
    }
  };
};

const deletePolicy = () => {
  return {
    type: "DELETE_POLICY",
    payload: {
      name: name,
      amount: amount
    }
  }
}

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: "CREATE_CLAIM",
    payload: {
      name: name,
      amountOfMoneyToCollection: amountOfMoneyToCollect
    }
  };
};

// Reducers (Departments)
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.ype === "CREATE_CLAIM") {
    // We care about this action (form)
    // oldListOfClaims.push(action.payload) // modifying an existing arr -- never going to see push in a reducer
    return [...oldListOfClaims, action.payload]; // creating a brand new array and adding records to it
    
    
  }
  
  // we don't care about the action (form)
  return oldListOfClaims;
};

const accounting = (bagOfMoney, action) => {
   if (action.type === "CREATE_CLAIM") {
     return bagOfMoney - action.payload.amountOfMoneyToCollect
     
   } else if (action.type === "CREATE_POLICY") {
     return bagOfMoney + action.payload.amount
     
   }
  
  return bagOfMoney
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === "CREATE_POLICY") {
    return [...listOfpolicies, action.payload.name];
    
  } else if (action.type === "DELETE_POLICY") {
    return listOfPolicies.filter(name => name !== action.payload.name)
  }
  
  return listOfPolicies;
}

console.log(Redux);

const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
});

const store = createStore(ourDepartments)

store.dispatch(createPolicy("Alex", 20));
store.dispatch(createPolicy("Jim", 30));
store.dispatch(createPolicy("Bob", 40));

store.dispatch(createPolicy("Alex", 120));
store.dispatch(createPolicy("Jim", 120));

store.dispatch(deletePolicy("Bob", 120));

console.log(store.getState());