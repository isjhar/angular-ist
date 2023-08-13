import { Job } from 'src/app/domain/entities/job';

export interface JobData {
  id: number;
  queue: string;
}

export function mapJobData(data: JobData): Job {
  return data;
}
