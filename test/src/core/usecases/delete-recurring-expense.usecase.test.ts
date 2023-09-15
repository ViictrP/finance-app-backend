import { deleteRecurringExpenseUsecase } from '../../../../src/core/usecases';
import { RequestError } from '../../../../src/core/errors/request.error';
import { RecurringExpenseRepository } from '../../../../src/core/repositories';

describe('deleteRecurringExpenseUsecase', () => {

    // Tests that the function successfully deletes a recurring expense with a valid id
    it('should successfully delete a recurring expense with a valid id', async () => {
      // Arrange
      const id = 'validId';
      const repository: Partial<RecurringExpenseRepository> = {
        get: jest.fn().mockResolvedValue({ id: 'validId' }),
        deleteOne: jest.fn().mockResolvedValue({ id: 'validId' }),
      };

      // Act
      await deleteRecurringExpenseUsecase(id, repository as RecurringExpenseRepository);

      // Assert
      expect(repository.get).toHaveBeenCalledWith(id);
      expect(repository.deleteOne).toHaveBeenCalledWith({ id: 'validId' });
    });

    // Tests that the function throws a RequestError if the recurring expense is not found for the given id
    it('should throw a RequestError if the recurring expense is not found for the given id', async () => {
      // Arrange
      const id = 'invalidId';
      const repository: Partial<RecurringExpenseRepository> = {
        get: jest.fn().mockResolvedValue(null),
      };

      // Act and Assert
      await expect(deleteRecurringExpenseUsecase(id, repository as RecurringExpenseRepository as RecurringExpenseRepository)).rejects.toThrow(RequestError);
      expect(repository.get).toHaveBeenCalledWith(id);
    });

    // Tests that the function throws an error if the repository get method throws an error
    it('should throw an error if the repository get method throws an error', async () => {
      // Arrange
      const id = 'validId';
      const repository: Partial<RecurringExpenseRepository> = {
        get: jest.fn().mockRejectedValue(new Error('Repository error')),
      };

      // Act and Assert
      await expect(deleteRecurringExpenseUsecase(id, repository as RecurringExpenseRepository)).rejects.toThrow(Error);
      expect(repository.get).toHaveBeenCalledWith(id);
    });

    // Tests that the function throws an error if the repository deleteOne method throws an error
    it('should throw an error if the repository deleteOne method throws an error', async () => {
      // Arrange
      const id = 'validId';
      const repository: Partial<RecurringExpenseRepository> = {
        get: jest.fn().mockResolvedValue({ id: 'validId' }),
        deleteOne: jest.fn().mockRejectedValue(new Error('Repository error')),
      };

      // Act and Assert
      await expect(deleteRecurringExpenseUsecase(id, repository as RecurringExpenseRepository)).rejects.toThrow(Error);
      expect(repository.get).toHaveBeenCalledWith(id);
      expect(repository.deleteOne).toHaveBeenCalledWith({ id: 'validId' });
    });

});
