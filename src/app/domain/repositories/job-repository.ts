import { GetableRepository } from '../base-repositories/getable-repository';
import { Job } from '../entities/job';
import { PaginationParams } from '../entities/pagination-params';

export interface JobRepository
  extends GetableRepository<PaginationParams, Job> {}
