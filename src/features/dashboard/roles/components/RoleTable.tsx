import { useMemo, useState, useCallback } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan, FaCheck } from "react-icons/fa6";
import PermissionDropdown from "./PermissionDropdown";
import { Permission } from "types/role";
import { RoleTableProps } from "types/component";

const RoleTable = ({ roles, checked, isLoading, permissions, permissionChecked, validOrInvalid, onEdit, onDelete, handlePermissionEdit, setChecked, setPermissionChecked }: RoleTableProps) => {
    const [dropdown, setDropdown] = useState<{ roleId: string, active: boolean }>({ roleId: "", active: false });

    const handleToggleDropdown = useCallback((roleId: string, rolePermissions?: Permission[]) => {
        setDropdown((prev) => ({ roleId, active: prev.roleId === roleId ? !prev.active : true }));
        setPermissionChecked(rolePermissions?.map((p) => p.id) || []);
    }, [setPermissionChecked]);

    const handleRowCheck = useCallback((roleId: string) => {
        setChecked((prev) => (prev?.includes(roleId) ? prev?.filter((id) => id !== roleId) : [...prev, roleId]));
    }, [setChecked]);

    const handleSelectAll = useCallback((checkedStatus: boolean) => {
        setChecked(checkedStatus ? roles.map((r) => r.id) : []);
    }, [roles, setChecked]);

    const renderedRoles = useMemo(() => roles.map((role) => (
        <div key={role.id} className="w-full grid grid-cols-5 items-center gap-4 cursor-pointer py-1">
            <div className="col-span-1 flex items-center gap-3">
                <label className="flex items-center cursor-pointer gap-2">
                    <input
                        type="checkbox"
                        className="peer hidden input"
                        checked={checked.includes(role.id)}
                        onChange={() => handleRowCheck(role.id)}
                    />
                    <div className="check-icon-bg min-w-6 min-h-6 border border-[var(--whiLg)] dark:border-[var(--darkInputBorder)] rounded-md flex items-center justify-center peer-checked:bg-[var(--primary)] transition-all duration-200" >
                        {checked.includes(role.id) && <FaCheck className="check-icon text-[var(--whi)] size-4" />}
                    </div>
                </label>
                <p className="text-[15px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium capitalize">{role.name}</p>
            </div>
            <div className="col-span-1">
                <button onClick={() => handleToggleDropdown(role.id, role.permissions)} className="flex items-center gap-2 py-1 px-2 bg-[var(--green)] rounded-md w-min text-[14px] text-[var(--whi)] leading-normal font-medium cursor-pointer">
                    Permissions
                </button>
            </div>
            <div className="col-span-1">
                <p className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium">{role.createdAt}</p>
            </div>
            <div className="col-span-1">
                <p className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium">{role.updatedAt}</p>
            </div>
            <div className="col-span-1 flex items-center justify-end gap-2">
                <button onClick={() => onDelete([role.id])} className="item w-9 h-9 rounded-full hover:bg-[var(--whiLg)] hover:dark:bg-[var(--darkBorderCl)] flex items-center justify-center" aria-label="Delete role" >
                    <FaTrashCan className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                </button>
                <button onClick={() => onEdit(role)} className="item w-9 h-9 rounded-full hover:bg-[var(--whiLg)] hover:dark:bg-[var(--darkBorderCl)] flex items-center justify-center" aria-label="Edit role" >
                    <FaEdit className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                </button>
            </div>
        </div>
    )), [roles, checked, handleRowCheck, handleToggleDropdown, onEdit, onDelete]);

    return (
        <div className="overflow-x-auto">
            <div className="min-w-[1150px]">
                <div className="grid grid-cols-5 items-center gap-4">
                    <div className="col-span-1 flex items-center gap-3">
                        <label className="flex items-center cursor-pointer gap-2">
                            <input
                                type="checkbox"
                                className="peer hidden input"
                                onChange={(e) => handleSelectAll(e.target.checked)}
                                checked={checked.length === roles.length && roles.length > 0}
                            />
                            <div className="check-icon-bg min-w-6 min-h-6 border border-[var(--whiLg)] dark:border-[var(--darkInputBorder)] rounded-md flex items-center justify-center peer-checked:bg-[var(--primary)] transition-all duration-200" >
                                {checked.length === roles.length && roles.length > 0 && <FaCheck className="w-4 h-4 text-white" />}
                            </div>
                        </label>
                        {checked.length > 0 && (
                            <div className="flex items-center gap-2">
                                <span className="text-[14px] leading-normal font-medium text-[var(--textCl)] dark:text-[var(--darkTextCl)]">{checked.length} Items</span>
                                <button onClick={() => onDelete(checked)} className="item w-6 h-6 rounded-full hover:bg-[var(--whiLg)] hover:dark:bg-[var(--darkBorderCl)] flex items-center justify-center cursor-pointer" aria-label="Delete selected roles" >
                                    <FaTrashCan className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                                </button>
                            </div>
                        )}
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">Role</p>
                    </div>
                    <div className="col-span-1">
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">Permissions</p>
                    </div>
                    <div className="col-span-1">
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">Created At</p>
                    </div>
                    <div className="col-span-1">
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">Updated At</p>
                    </div>
                    <div className="col-span-1 text-right">
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">Actions</p>
                    </div>
                </div>
                <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] mt-4" />
                {renderedRoles}
                {dropdown.active && (
                    <PermissionDropdown
                        role={{ id: dropdown.roleId }}
                        isLoading={isLoading}
                        permissions={permissions}
                        validOrInvalid={validOrInvalid}
                        permissionChecked={permissionChecked}
                        setPermissionChecked={setPermissionChecked}
                        handlePermissionEdit={handlePermissionEdit}
                        onClose={() => setDropdown({ roleId: "", active: false })}
                    />
                )}
            </div>
        </div>
    );
}

export default RoleTable;