"use client";
import { useTopics } from "./hooks/useTopics";
import { TopicTable } from "./components/TopicTable";
import { TopicModal } from "./components/TopicModal";
import Empty from "@components/Empty";
import Loader from "@components/Loader";
import { DeleteModal } from "@components/dashboard/DeleteModal";
import { TableHeader } from "@components/dashboard/TableHeader";
import { TableFooter } from "@components/dashboard/TableFooter";
import TopicSorted from "./components/TopicSorted";

export default function Topics() {
    const {
        page,
        limit,
        topics,
        filter,
        categories,
        search,
        checked,
        isLoading,
        editModal,
        totalPages,
        createModal,
        deleteModal,
        editTopic,
        isLoadingPage,
        validOrInvalid,
        setChecked,
        setEditTopic,
        setEditModal,
        setCreateModal,
        setDeleteModal,
        handleEdit,
        handleCreate,
        confirmDelete,
        handleNext,
        handlePrev,
        updateFilterParam,
        changeLimitOrPageOrSearch,
    } = useTopics();

    return (
        <div className={`h-full ${createModal || editModal ? "overflow-hidden" : "overflow-y-auto scroll-bar-none"}`}>
            <div className={`w-full p-4 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] ${createModal || editModal ? "blur-sm overflow-hidden" : "blur-none overflow-y-auto"}`}>
                <TopicSorted
                    filter={filter}
                    categories={categories}
                    updateFilterParam={updateFilterParam}
                />
                <TableHeader
                    limit={limit}
                    search={search}
                    btnTitle="Add Topic"
                    onAddClick={() => setCreateModal(true)}
                    onLimitChange={changeLimitOrPageOrSearch}
                />
                {
                    isLoadingPage ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader style={{ width: "100px", padding: "10px", background: "#000" }} />
                        </div>
                    ) : (
                        topics.length > 0 ? (
                            <TopicTable
                                topics={topics}
                                checked={checked}
                                setChecked={setChecked}
                                onEdit={(topic) => {
                                    setEditTopic(topic);
                                    setEditModal(true);
                                }}
                                onDelete={(id) => {
                                    setChecked([...id]);
                                    setDeleteModal(true);
                                }}
                            />
                        ) : <Empty />
                    )
                }
                <TableFooter
                    page={page}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    totalPages={totalPages}
                />
            </div>

            <TopicModal
                isOpen={createModal}
                isLoading={isLoading}
                title="Add New Topic"
                categories={categories}
                onSubmit={handleCreate}
                validOrInvalid={validOrInvalid}
                onClose={() => setCreateModal(false)}
            />

            {editTopic && (
                <TopicModal
                    isOpen={editModal}
                    title="Edit Topic"
                    onSubmit={handleEdit}
                    isLoading={isLoading}
                    initialData={editTopic}
                    categories={categories}
                    validOrInvalid={validOrInvalid}
                    onClose={() => setEditModal(false)}
                />
            )}

            {deleteModal && (
                <DeleteModal
                    title="Topic Delete"
                    setDelete={confirmDelete}
                    setCancel={() => setDeleteModal(false)}
                    text="Once you delete the topic and submit them, you can't restore them."
                />
            )}
        </div>
    )
}