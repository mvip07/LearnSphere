import Image from 'next/image';
import { FaEdit } from 'react-icons/fa';
import React, { useCallback } from 'react';
import { FaEye, FaTrashCan, FaCheck } from 'react-icons/fa6';
import { COLUMNS } from '../constants/constants';
import { UserTableProps } from 'src/types/component';

const UserTable = ({ onEdit, users, checked, onDelete, setChecked }: UserTableProps) => {
    const handleRowCheck = useCallback((userId: string) => {
        setChecked((prev) => (prev?.includes(userId) ? prev?.filter((id) => id !== userId) : [...prev, userId]));
    }, [setChecked]);

    const handleSelectAll = useCallback((checkedStatus: boolean) => {
        setChecked(checkedStatus ? users.map((u) => u.id) : []);
    }, [users, setChecked]);

    const truncateText = (text: string, maxLength: number) => (text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text);

    return (
        <div className="overflow-x-auto">
            <div className="min-w-[3000px]">
                <div className="grid grid-cols-14 gap-4">
                    {COLUMNS.map((col) => (
                        <div key={col.key} className={`col-span-${col.span}`}>
                            {col.key === "user" ? (
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center cursor-pointer gap-2">
                                        <input
                                            type="checkbox"
                                            className="peer hidden input"
                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                            checked={checked.length === users.length && users.length > 0}
                                        />
                                        <div className="check-icon-bg min-w-6 min-h-6 border border-[var(--whiLg)] dark:border-[var(--darkInputBorder)] rounded-md flex items-center justify-center peer-checked:bg-[var(--primary)] transition-all duration-200">
                                            {checked.length === users.length && users.length > 0 && <FaCheck className="w-4 h-4 text-white" />}
                                        </div>
                                    </label>
                                    {checked.length > 0 && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-[14px] leading-normal font-medium text-[var(--textCl)] dark:text-[var(--darkTextCl)]">{checked.length} Items</span>
                                            <div onClick={() => onDelete(checked)} className="item w-6 h-6 rounded-full hover:bg-[var(--whiLg)] hover:dark:bg-[var(--darkBorderCl)] flex items-center justify-center cursor-pointer" >
                                                <FaTrashCan className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                                            </div>
                                        </div>
                                    )}
                                    <p key={col.key} className="text-sm text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium ">
                                        {col.label}
                                    </p>
                                </div>
                            ) : (
                                <p key={col.key} className={`text-sm text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium ${col.key === 'actions' ? 'text-end' : ''}`}>
                                    {col.label}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
                <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] mt-4" />
                {
                    users.map((user) => (
                        <div key={user.id} className="grid grid-cols-14 items-center gap-4 py-1">
                            <div className="col-span-2 flex items-center gap-4">
                                <label className="flex items-center cursor-pointer gap-2">
                                    <input
                                        type="checkbox"
                                        className="peer hidden input"
                                        checked={checked.includes(user.id)}
                                        onChange={() => handleRowCheck(user.id)}
                                    />
                                    <div className="check-icon-bg min-w-6 min-h-6 border border-[var(--whiLg)] dark:border-[var(--darkInputBorder)] rounded-md flex items-center justify-center peer-checked:bg-[var(--primary)] transition-all duration-200">
                                        {checked.includes(user.id) && <FaCheck className="check-icon text-[var(--whi)] size-4" />}
                                    </div>
                                </label>
                                <div className="flex gap-2 items-center">
                                    <a href={`users/detail/${user.id}`} aria-label={`View details for ${user.username}`}>
                                        <Image
                                            width={36}
                                            height={36}
                                            loading="lazy"
                                            src={user.image as string}
                                            alt={`${user.username} avatar`}
                                            className="w-9 h-9 rounded-full"
                                        />
                                    </a>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p title={user.firstname} className="text-[15px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium capitalize">
                                                {truncateText(user.firstname, 20)}
                                            </p>
                                            <p title={user.lastname} className="text-[15px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium capitalize">
                                                {truncateText(user.lastname, 20)}
                                            </p>
                                        </div>
                                        <p title={user.username} className="text-[13px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium">
                                            @{truncateText(user.username, 20)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <p title={user.email} className="text-base text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium">
                                    {user.email}
                                </p>
                            </div>
                            <div className="col-span-1">
                                <p
                                    aria-label={`User ${user.block ? 'Blocked' : 'Unblocked'}`}
                                    className={`w-min text-sm text-white font-medium rounded-md py-1 px-2 ${user.block ? 'bg-[var(--red)]' : 'bg-[var(--green)]'}`}
                                >
                                    {user.block ? 'Blocked' : 'Unblocked'}
                                </p>
                            </div>
                            <div className="col-span-1">
                                <p
                                    aria-label={`User ${user.isVerified ? 'Verified' : 'Not Verified'}`}
                                    className={`w-min whitespace-nowrap text-sm text-[var(--whi)] font-medium rounded-md py-1 px-2 ${user.isVerified ? 'bg-[var(--green)]' : 'bg-[var(--yellow)]'}`}
                                >
                                    {user.isVerified ? 'Verified' : 'No Verified'}
                                </p>
                            </div>
                            <div className="col-span-1">
                                <p title={user.verificationCode ? user.verificationCode.toString() : ""} className="text-base text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium">
                                    {user.verificationCode}
                                </p>
                            </div>
                            <div className="col-span-1">
                                <p title={String(user.totalCoins)} className="text-base text-[var(--firstPlace)] font-medium">
                                    {user.totalCoins} 🟡
                                </p>
                            </div>
                            <div className="col-span-1">
                                <p title={user.follower} className="text-base text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium">
                                    {user.follower}
                                </p>
                            </div>
                            <div className="col-span-1">
                                <p title={user.following} className="text-base text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium">
                                    {user.following}
                                </p>
                            </div>
                            <div className="col-span-1 flex flex-wrap gap-2 items-center">
                                {
                                    user.roles && user.roles.length && user.roles.map((r) => (
                                        <p title={r.name} key={r.id} className="text-base text-[var(--whi)] font-medium w-min whitespace-nowrap bg-[var(--primary)] rounded-md py-1 px-2">
                                            {r.name}
                                        </p>
                                    ))
                                }
                            </div>
                            <div className="col-span-1">
                                <p title={user.createdAt} className="text-base text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium whitespace-nowrap">
                                    {user.createdAt}
                                </p>
                            </div>
                            <div className="col-span-1">
                                <p title={user.updatedAt} className="text-base text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium whitespace-nowrap">
                                    {user.updatedAt}
                                </p>
                            </div>
                            <div className="col-span-1 flex items-center justify-end gap-1">
                                <button
                                    onClick={() => onEdit(user)}
                                    aria-label={`Edit user ${user.username}`}
                                    className="w-9 h-9 rounded-full hover:bg-[var(--whiLg)] dark:hover:bg-[var(--darkBorderCl)] flex items-center justify-center"
                                >
                                    <FaEdit className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                                </button>
                                <button
                                    onClick={() => onDelete([user.id])}
                                    aria-label={`Delete user ${user.username}`}
                                    className="w-9 h-9 rounded-full hover:bg-[var(--whiLg)] dark:hover:bg-[var(--darkBorderCl)] flex items-center justify-center"
                                >
                                    <FaTrashCan className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                                </button>
                                <a
                                    href={`users/detail/${user.id}`}
                                    aria-label={`View user ${user.username}`}
                                    className="w-9 h-9 rounded-full hover:bg-[var(--whiLg)] dark:hover:bg-[var(--darkBorderCl)] flex items-center justify-center"
                                >
                                    <FaEye className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                                </a>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div >
    );
};

export default UserTable;