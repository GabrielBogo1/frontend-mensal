import { Item } from './item';

describe('Item', () => {
  it('should create an instance', () => {
    expect(new Item("aaa","tes", "teste", 25)).toBeTruthy();
  });
});
