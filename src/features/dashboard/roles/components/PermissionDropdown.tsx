import { memo, useCallback } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import Loader from "@components/Loader";
import { PermissionDropdownProps } from "src/types/component";

const PermissionDropdown = memo(({ role, isLoading, onClose, permissions, permissionChecked, validOrInvalid, setPermissionChecked, handlePermissionEdit }: PermissionDropdownProps) => {
    const handlePermissionToggle = useCallback((permissionId: string) => {
        setPermissionChecked((prev: string[]) => {
            return prev.includes(permissionId) ? prev.filter((id: string) => id !== permissionId) : [...prev, permissionId];
        });
    }, [setPermissionChecked]);

    return (
        <div className="fixed backdrop-blur-md w-full sm:w-[calc(100%-80px)] lg:w-[calc(100%-300px)] h-[calc(100%-66px)] top-[66px] lg:h-[calc(100%-77px)] lg:top-[77px] start-0 sm:start-[80px] lg:start-[300px] z-[100]">
            <div className="relative z-60 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full sm:w-96 h-[70vh] max-h-fit bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] rounded-sm box-shadow overflow-y-auto scroll-bar-none">
                <div className="sticky top-0 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)]">
                    <div className="flex items-center justify-between p-4">
                        <h2 className="text-[var(--dark)] dark:text-[var(--whi)] text-[18px] leading-normal capitalize font-medium">Role Permissions</h2>
                        <button onClick={onClose} className="h-9 w-9 rounded-full bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] flex items-center justify-center">
                            <FaXmark className="size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)] cursor-pointer" />
                        </button>
                    </div>
                </div>
                <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)]"></div>
                <ul>
                    {permissions.map((permission) => (
                        <li key={permission.id} className="px-4 py-2 flex items-center gap-4 cursor-pointer hover:bg-[var(--lgblue)] dark:hover:bg-[var(--dark)]" >
                            <label className="flex items-center cursor-pointer gap-2">
                                <input
                                    type="checkbox"
                                    className="peer hidden input"
                                    checked={permissionChecked.includes(permission.id)}
                                    onChange={() => handlePermissionToggle(permission.id)}
                                />
                                <div className="check-icon-bg min-w-6 min-h-6 border border-[var(--whiLg)] dark:border-[var(--darkInputBorder)] rounded-md flex items-center justify-center peer-checked:bg-[var(--primary)] transition-all duration-200">
                                    {permissionChecked.includes(permission.id) && <FaCheck className="check-icon text-[var(--whi)] size-4" />}
                                </div>
                            </label>
                            <div>
                                <span className="text-[16px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] capitalize leading-normal font-medium">{permission.name}</span>
                                <p className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-light">{permission.path}</p>
                            </div>
                        </li>
                    ))}
                </ul>

                {validOrInvalid.permissions?.map((error, idx) => (
                    <p key={idx} className="p-4 text-[13px] text-[var(--error)] font-medium capitalize inline-block">{error}</p>
                ))}
                <div className="sticky z-60 bottom-0 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)]">
                    <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)]"></div>
                    <div className="flex items-center gap-4 p-4">
                        <button
                            disabled={isLoading}
                            onClick={() => handlePermissionEdit({ id: role.id, permissions: permissionChecked })}
                            className="text-[16px] text-[var(--whi)] bg-[var(--primary)] font-medium leading-normal capitalize py-2 px-4 rounded cursor-pointer"                        >
                            {isLoading ? <Loader style={{ width: "25px", padding: "3px", background: "#fff" }} /> : "Submit"}
                        </button>
                        <button onClick={onClose} className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] font-medium leading-normal capitalize py-2 px-4 rounded cursor-pointer select-none border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

PermissionDropdown.displayName = 'PermissionDropdown';
export default PermissionDropdown;