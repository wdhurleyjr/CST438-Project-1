export const openDatabaseAsync = jest.fn(() => ({
  execAsync: jest.fn((query, params) => {
    if (query.includes('SELECT')) {
      return Promise.resolve({
        rows: {
          _array: []
        }
      });
    }
    return Promise.resolve({
      rows: { _array: [] }
    });
  }),

  runAsync: jest.fn((query, params) => {
    return Promise.resolve();
  })
}));

  
  
  
  
  