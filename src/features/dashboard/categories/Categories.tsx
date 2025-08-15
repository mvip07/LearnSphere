"use client";
import Empty from "@/app/[lang]/components/Empty";
import Loader from "@/app/[lang]/components/Loader";
import { DeleteModal } from "@/app/[lang]/components/dashboard/DeleteModal";
import { TableHeader } from "@/app/[lang]/components/dashboard/TableHeader";
import { TableFooter } from "@/app/[lang]/components/dashboard/TableFooter";
import { CategoryTable } from "./components/CategoryTable";
import { CategoryModal } from "./components/CategoryModal";
import { useCategories } from "./hooks/useCategories";

export default function Categories() {
    const {
        page,
        limit,
        categories,
        search,
        checked,
        isLoading,
        editModal,
        totalPages,
        createModal,
        deleteModal,
        editCategory,
        isLoadingPage,
        validOrInvalid,
        setChecked,
        setEditCategory,
        setEditModal,
        setCreateModal,
        setDeleteModal,
        handleEdit,
        handleCreate,
        confirmDelete,
        handleNext,
        handlePrev,
        changeLimitOrPageOrSearch,
    } = useCategories();

    return (
        <div className={`h-full ${createModal || editModal ? 'overflow-hidden' : 'overflow-y-auto scroll-bar-none'}`}>
            <div className={`w-full p-4 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] ${createModal || editModal ? 'blur-sm overflow-hidden' : 'overflow-y-auto'}`}>
                <TableHeader
                    limit={limit}
                    search={search}
                    btnTitle="Add Category"
                    onAddClick={() => setCreateModal(true)}
                    onLimitChange={changeLimitOrPageOrSearch}
                />
                {
                    isLoadingPage ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader style={{ width: '100px', padding: '10px', background: '#000' }} />
                        </div>
                    ) : categories.length > 0 ? (
                        <CategoryTable
                            checked={checked}
                            categories={categories}
                            setChecked={setChecked}
                            onEdit={(category) => {
                                setEditCategory(category);
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
            <CategoryModal
                isOpen={createModal}
                isLoading={isLoading}
                onSubmit={handleCreate}
                title="Add New Category"
                validOrInvalid={validOrInvalid}
                onClose={() => setCreateModal(false)}
            />

            {editCategory && (
                <CategoryModal
                    isOpen={editModal}
                    title="Edit Category"
                    onSubmit={handleEdit}
                    isLoading={isLoading}
                    initialData={editCategory}
                    validOrInvalid={validOrInvalid}
                    onClose={() => setEditModal(false)}
                />
            )}

            {deleteModal && (
                <DeleteModal
                    title="Category Delete"
                    setDelete={confirmDelete}
                    setCancel={() => setDeleteModal(false)}
                    text="Once you delete the categories and submit them, you can't restore them."
                />
            )}
        </div>
    )
}