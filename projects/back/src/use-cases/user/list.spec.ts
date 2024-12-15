import { describe, it, expect, vi } from 'vitest';
import { listCase } from './list';
import { likesCountUseCase } from '../movie/likes-count';
import type { DbContract } from '../../infra/db';

vi.mock('../movie/likes-count', () => ({
  likesCountUseCase: vi.fn(),
}));

describe('listCase', () => {
  const mockDB: DbContract = {
    OP: {
      USER: {
        fetchById: vi.fn(),
      },
    },
  } as unknown as DbContract;

  const mockUser = { id: '123', name: 'John Doe', login: 'johndoe' };

  it('should return user data and likes count when user is found', async () => {
    // Mockando o comportamento do DB e likesCountUseCase
    (mockDB.OP.USER.fetchById as any).mockResolvedValue(mockUser);
    (likesCountUseCase as any).mockResolvedValue(10);

    const result = await listCase(mockDB, '123');

    expect(result).toEqual({
      status: 'OK',
      payload: mockUser,
      likes: 10,
    });
    expect(mockDB.OP.USER.fetchById).toHaveBeenCalledWith('123');
    expect(likesCountUseCase).toHaveBeenCalledWith(mockDB, '123');
  });

  it('should return status ERROR when user is not found', async () => {
    // Mockando o comportamento de não encontrar o usuário
    (mockDB.OP.USER.fetchById as any).mockResolvedValue(null);

    const result = await listCase(mockDB, '999');

    expect(result).toEqual({
      status: 'ERROR',
      payload: undefined,
    });
    expect(mockDB.OP.USER.fetchById).toHaveBeenCalledWith('999');
  });

  it('should throw an error if likesCountUseCase fails', async () => {
    // Mockando o usuário encontrado, mas o likesCountUseCase falha
    (mockDB.OP.USER.fetchById as any).mockResolvedValue(mockUser);
    (likesCountUseCase as any).mockRejectedValue(new Error('Likes count failed'));

    await expect(listCase(mockDB, '123')).rejects.toThrow('Likes count failed');

    expect(mockDB.OP.USER.fetchById).toHaveBeenCalledWith('123');
    expect(likesCountUseCase).toHaveBeenCalledWith(mockDB, '123');
  });
});
