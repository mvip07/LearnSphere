import React, { memo } from 'react';
import { getFilterConfigs } from '../constants/constants';
import { UserSortedProps } from 'src/types/component';

const UserSorted = ({ filter, roles, updateFilterParam }: UserSortedProps) => {
    const filterConfigs = getFilterConfigs(roles);
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
                        aria-label={label}
                        value={filter[key]}
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

export default memo(UserSorted);