import React, { memo } from 'react';
import { getFilterConfigs } from '../constants/constants';
import { TopicSortedProps } from '@/types/component.t';

const TopicSorted = ({ filter, categories, updateFilterParam }: TopicSortedProps) => {
    const filterConfigs = getFilterConfigs(categories);
    return (
        <div className="grid grid-cols-12 gap-4 items-center mb-4">
            {filterConfigs.map(({ key, label, options }) => (
                <div key={key} className="col-span-6 sm:col-span-4 lg:col-span-2 xl:col-span-2">
                    <label htmlFor={key} className="sr-only">
                        {label}
                    </label>
                    <select
                        id={key}
                        name={key}
                        value={filter[key]}
                        aria-label={label}
                        className="input w-full outline-0 py-2"
                        onChange={(e) => updateFilterParam(key, e.target.value)}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
};

export default memo(TopicSorted);