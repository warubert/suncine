import { describe, it, expect, vi } from 'vitest';
import { likesCountUseCase } from './likes-count';
import type { DbContract } from '../../infra/db';

describe('likesCountUseCase', () => {
  const mockDB: DbContract = {
    OP: {
      MOVIE: {
        findUserLikes: vi.fn(),
      },
    },
  } as unknown as DbContract;

  it('should return the correct number of likes for a given user', async () => {
    // Mockando o comportamento de encontrar os likes do usuário
    (mockDB.OP.MOVIE.findUserLikes as any).mockResolvedValue([{}, {}, {}]); // Simula 3 likes

    const result = await likesCountUseCase(mockDB, 'user123');

    expect(result).toBe(3);
    expect(mockDB.OP.MOVIE.findUserLikes).toHaveBeenCalledWith('user123');
  });

  it('should return 0 when the user has no likes', async () => {
    // Mockando o comportamento sem likes
    (mockDB.OP.MOVIE.findUserLikes as any).mockResolvedValue([]);

    const result = await likesCountUseCase(mockDB, 'user456');

    expect(result).toBe(0);
    expect(mockDB.OP.MOVIE.findUserLikes).toHaveBeenCalledWith('user456');
  });

  it('should throw an error if findUserLikes fails', async () => {
    // Mockando o comportamento de falha
    (mockDB.OP.MOVIE.findUserLikes as any).mockRejectedValue(new Error('Database error'));

    await expect(likesCountUseCase(mockDB, 'user789')).rejects.toThrow('Database error');
    expect(mockDB.OP.MOVIE.findUserLikes).toHaveBeenCalledWith('user789');
  });
});
