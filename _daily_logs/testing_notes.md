## April 3rd 2024
- Start of TESTING w/ J E S T ! ! !
- General functionalities that we will be testing: business logic, component rendering based on props, state management, and event handling.
- "Test the contract, not the implementation". This means that we'll be testing if the component is behaving as expected. We are NOT testing **HOW** it achieves that behavior. This approach allows the code to be refactored and updated over time, without having to rewrite the tests.
- Write clear, descriptive test cases. This will allow us to better understand what is being tested and also easier to understand test failures.'
- [Helpful article for Jest](https://testrigor.com/blog/jest-testing/)
- [Awesome guide/tutorial](https://www.robinwieruch.de/react-testing-library/)
- Added a `moduleNameMapper` configuration in the `jest.config.ts` file
- Created a `__mock__` folder within `__tests__` folder. Then created a `fileMock.js` file that included `module.exports = 'test-file-stub`
  - This setup tells Jest to replace imports of the specified file types with the export from `fileMock.js`, effectively bypassing the syntax error when encountering binary files
  - This is mainly used when we create mock data to be used in unit testing
- In file `.eslintrc.cjs`, added `node: true` to the environment property: `env: { browser: true, es2020: true, jest: true, node: true },`
  - This will tell the ES linter to accept the environment with all the contents added to the propery. In this case, modules and imports/exports would be accepted without triggering linting errors


## April 5th
- Created pull request for adjustments in code to deploy to main
- Completed `HomePage.tests.tsx`:
  - We import the `Provider` component wrapper from `react-redux`, so we're able to pass state into our test unit
  - We import the `HomePage` component
  - Using `jest.mock(arg1 (the import location of component we want to mock), arg2 (the returned result of how we want it to display in our test))`, we create mocks of all the sections that exists within HomePage
  - Notice, inthis test we're only going to text if the components are rendered as text within the file


## April 6th:
- Start unit testing within `Navbar` component:
- Using **Real Store** vs **Mock Store** (state management) in unit testing:
  - Pros of **Real Store**:
    1. Realistic Tests: This is most appropriate when writing integration tests when testing to see how components integrate with global state
    2. Ease of Setup: Importing and wrapping components in the provider with the real store is straightforward. Requires less setup compared to mocking a store or specific slices of state.
   
  - Cons of **Real Store**:
    1. Complexity and Speed: Tests are generally more complex and slower as using the real store requires more logic and external dependencies. This is a result for integration tests.

    For unit tests, the goal is to isolate the component as much as possible.
    2. State Persistemce: State can persist between tests if not handled correctly. This requires proper implementation of `beforeEach/beforeAll` and `afterEach/afterAll` hooks to avoid unwanted changes in initial state


  - Pros of **Mock Store**:
    1. Isolation: Mock stores can be tailored to the needs of unit tests, gives more control.
    2. Simplicity: Can explicitly define all state that is required for the test at hand
    3. No State Persistence: Each test creates the specific state it requires and the mocked states only exists where they're needed. No worrying about state persistence across tests.
  
  - Cons of **Mock Store**:
    1. Less Realistic: Tests might not fully capture the interactions and behaviors of the real application, especially for integration tests
    2. Additional Setup: Requires more setup to create a mock environment and provide the relevant state and dispatch functions.

- Updated `"include"` property within `tsconfig.json` to `"__tests__"` so that TypeScript can successfully apply types to testing files

### Navbar component unit testing
- To simulate user actions on site, installed two additional libraries:
  - `npm install @testing-library/user-event` & `npm install @testing-library/dom`
- [Docs for user events here](https://testing-library.com/docs/user-event/intro)

### Notes for configuring a mock store for unit testing:
```
Adapting Your Store Configuration for Testing
When you want to customize the store for testing, you can recreate a similar structure to what you have in your application's store configuration. Here's how you can adapt your renderWithRedux function using your existing reducers, allowing for optional overriding or partial reducer setup:

javascript
Copy code
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
// Import your reducers
import responseSliceReducer from '../Features/Response/responseSlice';
// import other reducers...

// Optional: Create a helper function to configure a test store
const createTestStore = (overrideReducers = {}) => {
  return configureStore({
    reducer: {
      // Use your actual reducers, but allow them to be overridden or omitted in tests
      response: responseSliceReducer,
      // add other reducers...
      ...overrideReducers, // This allows overriding specific reducers for a test
    },
  });
};

const renderWithRedux = (
  component,
  { initialState, store = createTestStore() } = {}
) => {
  // If there's an initialState, dispatch an action to initialize it
  if (initialState) {
    store.dispatch({ type: 'INIT_STATE', payload: initialState });
  }

  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store, // This allows you to interact with the store in your tests
  };
};

export default renderWithRedux;

Notes on Testing with Custom Store Configurations
Override Specific Reducers: The overrideReducers parameter in createTestStore allows you to provide mock or simplified reducers for specific slices of state relevant to the component you're testing. This is useful when you want to isolate the component from the rest of the application state or when you need to test specific state behaviors without setting up the entire store.

Initial State: If your tests require the store to start with a specific state, you can dispatch an initial action to set this state. This approach requires you to handle the INIT_STATE action in your reducers, which might not always be desirable. An alternative is to directly use the preloadedState option of configureStore to set the initial state, but this requires setting up the entire state shape expected by your reducers.

Testing Slice Isolation: For tests that only involve interactions with a single slice of state, consider directly importing and using the slice reducer in a test-specific store setup. This approach is very focused and ignores the broader application state, which can be beneficial for unit testing.

This setup keeps your tests flexible and closely aligned with the actual store configuration in your application, while still allowing for the customization needed for focused testing.
```

**Need To-DO's:***
- Implement accessibiliy features throughout our front end
- Writing tests to check if all interactive elements are accessible by keyboard and screen readers
- Ensuring labels, roles and properties are correctly set for interactive elements