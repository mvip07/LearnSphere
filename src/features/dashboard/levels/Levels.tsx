"use client";
import { useLevels } from "./hooks/useLevels";
import Loader from "@components/Loader";
import Empty from "@components/Empty";
import { LevelModal } from "./components/LevelModal";
import { LevelTable } from "./components/LevelTable";
import { DeleteModal } from "@components/dashboard/DeleteModal";
import { TableHeader } from "@components/dashboard/TableHeader";
import { TableFooter } from "@components/dashboard/TableFooter";

export default function Levels() {
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
        editLevel,
        isLoadingPage,
        levels,
        validOrInvalid,
        setChecked,
        setEditLevel,
        setEditModal,
        setCreateModal,
        setDeleteModal,
        handleEdit,
        handleCreate,
        confirmDelete,
        handleNext,
        handlePrev,
        changeLimitOrPageOrSearch,
    } = useLevels();

    return (
        <div className={`h-full outline-0 ${createModal || editModal ? "overflow-hidden" : "overflow-y-auto scroll-bar-none"}`}>
            <div className={`w-full p-4 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] ${createModal || editModal ? "blur-sm overflow-hidden" : "blur-none overflow-y-auto"}`}>
                <TableHeader
                    limit={limit}
                    search={search}
                    btnTitle="Add Level"
                    onLimitChange={changeLimitOrPageOrSearch}
                    onAddClick={() => setCreateModal(true)}
                />
                {
                    isLoadingPage ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader style={{ width: "100px", padding: "10px", background: "#000" }} />
                        </div>
                    ) : levels.length > 0 ? (
                        <LevelTable
                            levels={levels}
                            checked={checked}
                            setChecked={setChecked}
                            validOrInvalid={validOrInvalid}
                            onEdit={(level) => {
                                setEditLevel(level);
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
            <LevelModal
                isOpen={createModal}
                isLoading={isLoading}
                title="Add New Level"
                onSubmit={handleCreate}
                validOrInvalid={validOrInvalid}
                onClose={() => setCreateModal(false)}
            />

            {editModal && (
                <LevelModal
                    isOpen={editModal}
                    title="Edit Level"
                    onSubmit={handleEdit}
                    isLoading={isLoading}
                    initialData={editLevel}
                    validOrInvalid={validOrInvalid}
                    onClose={() => setEditModal(false)}
                />
            )}

            {deleteModal && (
                <DeleteModal
                    title="Level Delete"
                    setDelete={confirmDelete}
                    setCancel={() => setDeleteModal(false)}
                    text="Once you delete the levels and submit them, you can't restore them."
                />
            )}
        </div>
    )
}