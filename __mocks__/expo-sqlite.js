export const openDatabase = jest.fn(() => ({
    transaction: jest.fn((callback) => {
      callback({
        executeSql: jest.fn((query, params, successCallback) => {
          successCallback(null, { rows: { _array: [] } });
        })
      });
    })
  }));
  
  
  
  
  