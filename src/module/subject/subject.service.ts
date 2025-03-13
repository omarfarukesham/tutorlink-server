// import QueryBuilder from '../../builder/queryBuilder';
import QueryBuilder from '../../builder/querybuilder';
import { ISubject } from './subject.interface';
import Subject from './subject.model';

// Create a new subject
const createSubject = async (payload: ISubject): Promise<ISubject> => {
  const result = await Subject.create(payload);
  return result;
};

// Get all subjects with search, filtering, and pagination
const getSubjects = async (query: Record<string, unknown>) => {
  const subjects = new QueryBuilder(Subject.find(), query)
    .search(['name', 'gradeLevel', 'category'])
    .filter()
    .sort()
    // .paginate()
    .select();

  const result = await subjects.modelQuery;
  return result;
};

// Update a subject
const updateSubject = async (
  id: string,
  payload: Partial<ISubject>,
): Promise<ISubject | null> => {
  const result = await Subject.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// Delete a subject
const deleteSubject = async (id: string): Promise<ISubject | null> => {
  const result = await Subject.findByIdAndDelete(id);
  return result;
};

export const subjectService = {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
};