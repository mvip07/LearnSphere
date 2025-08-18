"use client";
import { useRoles } from "./hooks/useRoles";
import RoleTable from "./components/RoleTable";
import RoleModal from "./components/RoleModal";
import Empty from "@components/Empty";
import Loader from "@components/Loader";
import { DeleteModal } from "@components/dashboard/DeleteModal";
import { TableHeader } from "@components/dashboard/TableHeader";
import { TableFooter } from "@components/dashboard/TableFooter";

export default function Roles() {
    const {
        page,
        limit,
        roles,
        search,
        checked,
        setChecked,
        setCreateModal,
        isLoading,
        editModal,
        totalPages,
        permissions,
        createModal,
        deleteModal,
        setEditRole,
        setEditModal,
        editRole,
        setDeleteModal,
        permissionChecked,
        setPermissionChecked,
        isLoadingPage,
        validOrInvalid,
        handleEdit,
        confirmDelete,
        handleNext,
        handlePrev,
        handleCreate,
        handlePermissionEdit,
        changeLimitOrPageOrSearch,
    } = useRoles();

    return (
        <div className={`h-full ${createModal || editModal ? "overflow-hidden" : "overflow-y-auto scroll-bar-none"}`}>
            <div className={`w-full p-4 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] ${createModal || editModal ? "blur-sm overflow-hidden" : "blur-none overflow-y-auto"}`}>
                <TableHeader
                    limit={limit}
                    search={search}
                    btnTitle="Add Role"
                    onLimitChange={changeLimitOrPageOrSearch}
                    onAddClick={() => setCreateModal(true)}
                />
                {
                    isLoadingPage ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader style={{ width: "100px", padding: "10px", background: "#000" }} />
                        </div>
                    ) : roles.length > 0 ? (
                        <RoleTable
                            roles={roles}
                            checked={checked}
                            isLoading={isLoading}
                            setChecked={setChecked}
                            permissions={permissions}
                            validOrInvalid={validOrInvalid}
                            permissionChecked={permissionChecked}
                            handlePermissionEdit={handlePermissionEdit}
                            setPermissionChecked={setPermissionChecked}
                            onEdit={(role) => {
                                setEditRole(role);
                                setEditModal(true);
                            }}
                            onDelete={(ids) => {
                                setChecked(ids);
                                setDeleteModal(true);
                            }}
                        />

                    ) : <Empty />
                }
                <TableFooter
                    page={page}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    totalPages={totalPages}
                />
            </div>
            <RoleModal
                isOpen={createModal}
                title="Add New Role"
                isLoading={isLoading}
                onSubmit={handleCreate}
                permissions={permissions}
                validOrInvalid={validOrInvalid}
                onClose={() => setCreateModal(false)}
            />
            {editRole && (
                <RoleModal
                    title="Edit Role"
                    isOpen={editModal}
                    onSubmit={handleEdit}
                    isLoading={isLoading}
                    initialData={editRole}
                    permissions={permissions}
                    validOrInvalid={validOrInvalid}
                    onClose={() => setEditModal(false)}
                />
            )}
            {deleteModal && (
                <DeleteModal
                    title="Role Delete"
                    setDelete={confirmDelete}
                    setCancel={() => setDeleteModal(false)}
                    text="Once you delete the roles, they cannot be restored."
                />
            )}
        </div>
    );
}