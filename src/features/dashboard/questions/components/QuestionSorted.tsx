import React, { memo } from 'react';
import { getFilterConfigs } from '../constants/constants';
import { QuestionSortedProps } from '@/types/component.t';

const QuestionSorted = ({ filter, topics, levels, categories, type, updateFilterParam }: QuestionSortedProps) => {
    const filterConfigs = getFilterConfigs(categories, levels, topics, type);
    return (
        <div className="grid grid-cols-8 gap-4 items-center mb-4">
            {filterConfigs.map(({ key, options }, index) => (
                <div key={index} className="col-span-8 sm:col-span-4 lg:col-span-2 xl:col-span-2">
                    <select
                        id={key}
                        name={key}
                        className="input w-full outline-0 py-2 mt-2"
                        onChange={(e) => { updateFilterParam(key, e.target.value) }}
                        value={typeof filter[key] === 'string' ? filter[key] : Array.isArray(filter[key]) && filter[key]?.length ? filter[key][0] : ''}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            )
            )}
        </div>
    );
};

export default memo(QuestionSorted);