import { GenericFilter } from '../../../shared/models/generic-filter.model';

export interface ItemFilter extends GenericFilter {
    categories?: number[];
}
