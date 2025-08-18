import { useCallback, useMemo } from "react";
import { FaEdit } from "react-icons/fa";
import { FaCheck, FaTrashCan } from "react-icons/fa6";
import { PermissionTableProps } from "src/types/component";

export const PermissionTable = ({ checked, onEdit, onDelete, setChecked, permissions }: PermissionTableProps) => {
    const handleRowCheck = useCallback((permissionId: string) => {
        setChecked((prev) => (prev?.includes(permissionId) ? prev?.filter((id) => id !== permissionId) : [...prev, permissionId]));
    }, [setChecked]);

    const handleSelectAll = useCallback((checkedStatus: boolean) => {
        setChecked(checkedStatus ? permissions.map((p) => p.id) : []);
    }, [permissions, setChecked]);

    const renderedPermission = useMemo(() => permissions.map((permission) => (
        <div key={permission.id} className="w-full grid grid-cols-7 items-center gap-4 border-b border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] cursor-pointer py-1">
            <div className="col-span-2 flex items-center gap-3">
                <label className="flex items-center cursor-pointer gap-2">
                    <input
                        type="checkbox"
                        className="peer hidden input"
                        checked={checked.includes(permission.id)}
                        onChange={() => handleRowCheck(permission.id)}
                    />
                    <div className="check-icon-bg min-w-6 min-h-6 border border-[var(--whiLg)] dark:border-[var(--darkInputBorder)] rounded-md flex items-center justify-center peer-checked:bg-[var(--primary)] transition-all duration-200">
                        {checked.includes(permission.id) && <FaCheck className="check-icon text-[var(--whi)] size-4" />}
                    </div>
                </label>
                <p className="text-[15px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium capitalize">{permission.name}</p>
            </div>
            <div className="col-span-2">
                <p className="w-min text-[14px] text-[var(--whi)] leading-normal font-medium rounded-md py-1 px-2 bg-[var(--yellow)]">{permission.path}</p>
            </div>
            <div className="col-span-1">
                <p className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium">{permission.createdAt}</p>
            </div>
            <div className="col-span-1">
                <p className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium">{permission.updatedAt}</p>
            </div>
            <div className="col-span-1 flex items-center justify-end gap-2">
                <button onClick={() => onDelete([permission.id])} className="item w-9 h-9 rounded-full hover:bg-[var(--whiLg)] hover:dark:bg-[var(--darkBorderCl)] flex items-center justify-center" aria-label="Delete permission" >
                    <FaTrashCan className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                </button>
                <button onClick={() => onEdit(permission)} className="item w-9 h-9 rounded-full hover:bg-[var(--whiLg)] hover:dark:bg-[var(--darkBorderCl)] flex items-center justify-center" aria-label="Edit permission" >
                    <FaEdit className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                </button>
            </div>
        </div>
    )), [permissions, checked, handleRowCheck, onEdit, onDelete]);

    return (
        <div className="overflow-x-auto">
            <div className="min-w-[1150px]">
                <div className="w-full grid grid-cols-7 gap-4">
                    <div className="col-span-2 flex items-center gap-3">
                        <label className="flex items-center cursor-pointer gap-2">
                            <input
                                type="checkbox"
                                className="peer hidden input"
                                onChange={(e) => handleSelectAll(e.target.checked)}
                                checked={checked.length === permissions.length && permissions.length > 0}
                            />
                            <div className="check-icon-bg min-w-6 min-h-6 border border-[var(--whiLg)] dark:border-[var(--darkInputBorder)] rounded-md flex items-center justify-center peer-checked:bg-[var(--primary)] transition-all duration-200">
                                {checked.length === permissions.length && permissions.length > 0 && <FaCheck className="w-4 h-4 text-white" />}
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
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">Permission</p>
                    </div>
                    <div className="col-span-2">
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">Path</p>
                    </div>
                    <div className="col-span-1">
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">Created At</p>
                    </div>
                    <div className="col-span-1">
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">Updated At</p>
                    </div>
                    <div className="col-span-1">
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal text-end">Actions</p>
                    </div>
                </div>
                <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] mt-4" />
                {renderedPermission}
            </div>
        </div>
    );
};