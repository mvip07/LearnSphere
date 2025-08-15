"use client";
import { DeleteModal } from "@/app/[lang]/components/dashboard/DeleteModal";
import { PermissionTable } from "./components/PermissionTable";
import { PermissionModal } from "./components/PermissionModal";
import { usePermissions } from "./hooks/usePermissions";

import Empty from "@/app/[lang]/components/Empty";
import Loader from "@/app/[lang]/components/Loader";
import { TableHeader } from "@/app/[lang]/components/dashboard/TableHeader";
import { TableFooter } from "@/app/[lang]/components/dashboard/TableFooter";

export default function Permissions() {
    const {
        page,
        limit,
        search,
        checked,
        isLoading,
        editModal,
        totalPages,
        createModal,
        deleteModal,
        editPermission,
        isLoadingPage,
        permissions,
        validOrInvalid,
        setChecked,
        setEditPermission,
        setEditModal,
        setCreateModal,
        setDeleteModal,
        handleEdit,
        handleCreate,
        confirmDelete,
        handleNext,
        handlePrev,
        changeLimitOrPageOrSearch,
    } = usePermissions();

    return (
        <div className={`h-full outline-0 ${createModal || editModal ? "overflow-hidden" : "overflow-y-auto scroll-bar-none"}`}>
            <div className={`w-full p-4 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] ${createModal || editModal ? "blur-sm overflow-hidden" : "blur-none overflow-y-auto"}`}>
                <TableHeader
                    limit={limit}
                    search={search}
                    btnTitle="Add Permission"
                    onLimitChange={changeLimitOrPageOrSearch}
                    onAddClick={() => setCreateModal(true)}
                />
                {
                    isLoadingPage ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader style={{ width: "100px", padding: "10px", background: "#000" }} />
                        </div>
                    ) : permissions.length > 0 ? (
                        <PermissionTable
                            checked={checked}
                            permissions={permissions}
                            setChecked={setChecked}
                            validOrInvalid={validOrInvalid}
                            onEdit={(permission) => {
                                setEditPermission(permission);
                                setEditModal(true);
                            }}
                            onDelete={(id) => {
                                setChecked([...id]);
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
            <PermissionModal
                isOpen={createModal}
                title="Add New Permission"
                isLoading={isLoading}
                onSubmit={handleCreate}
                validOrInvalid={validOrInvalid}
                onClose={() => setCreateModal(false)}
            />

            {editPermission && (
                <PermissionModal
                    isOpen={editModal}
                    onSubmit={handleEdit}
                    isLoading={isLoading}
                    title="Edit Permission"
                    initialData={editPermission}
                    validOrInvalid={validOrInvalid}
                    onClose={() => setEditModal(false)}
                />
            )}

            {deleteModal && (
                <DeleteModal
                    title="Permission Delete"
                    setDelete={confirmDelete}
                    setCancel={() => setDeleteModal(false)}
                    text="Once you delete the permissions and submit them, you can't restore them."
                />
            )}
        </div>
    )
}