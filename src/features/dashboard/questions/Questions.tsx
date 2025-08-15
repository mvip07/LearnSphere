import { useCallback } from 'react';
import Empty from '@/app/[lang]/components/Empty';
import Loader from '@/app/[lang]/components/Loader';
import { DeleteModal } from '@/app/[lang]/components/dashboard/DeleteModal';
import { TableHeader } from '@/app/[lang]/components/dashboard/TableHeader';
import { TableFooter } from '@/app/[lang]/components/dashboard/TableFooter';
import QuestionModal from './components/QuestionModal';
import QuestionSorted from './components/QuestionSorted';
import { QuestionTable } from './components/QuestionTable';
import { useQuestions } from './hooks/useQuestions';
import { Question } from '@/types/quiz.t';

export default function Questions() {
    const {
        page,
        limit,
        search,
        filter,
        topics,
        levels,
        questions,
        categories,
        isLoading,
        isLoadingPage,
        totalPages,
        createModal,
        editModal,
        deleteModal,
        editQuestion,
        checked,
        validOrInvalid,
        setChecked,
        setEditQuestion,
        setEditModal,
        setCreateModal,
        setDeleteModal,
        handleCreate,
        handleEdit,
        confirmDelete,
        handleNext,
        handlePrev,
        setValidOrInvalid,
        updateFilterParam,
        changeLimitOrPageOrSearch,
    } = useQuestions();

    const handleEditClick = useCallback((question: Question) => {
        setEditQuestion(question);
        setEditModal(true);
    }, [setEditQuestion, setEditModal]);

    const handleDeleteClick = useCallback((ids: string[]) => {
        setChecked(ids);
        setDeleteModal(true);
    }, [setChecked, setDeleteModal]);

    return (
        <div className={`h-full ${createModal || editModal ? 'overflow-hidden' : 'overflow-y-auto scroll-bar-none'}`}>
            <div className={`w-full p-4 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] ${createModal || editModal ? 'blur-sm overflow-hidden' : 'overflow-y-auto'}`}>
                <QuestionSorted
                    filter={filter}
                    topics={topics}
                    levels={levels}
                    categories={categories}
                    updateFilterParam={updateFilterParam}
                    type={['multiple-choice', 'input', 'fill-in-the-blank', 'image', 'video', 'audio']}
                />
                <TableHeader
                    limit={limit}
                    search={search}
                    btnTitle="Add Question"
                    onLimitChange={changeLimitOrPageOrSearch}
                    onAddClick={() => setCreateModal(true)}
                />
                {
                    isLoadingPage ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader style={{ width: '100px', padding: '10px', background: '#000' }} />
                        </div>
                    ) : questions.length > 0 ? (
                        <QuestionTable
                            checked={checked}
                            questions={questions}
                            setChecked={setChecked}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteClick}
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
            <QuestionModal
                topics={topics}
                levels={levels}
                isOpen={createModal}
                isLoading={isLoading}
                categories={categories}
                title="Add New Question"
                onSubmit={handleCreate}
                validOrInvalid={validOrInvalid}
                onClose={() => { setCreateModal(false); setValidOrInvalid({}) }}
            />
            {editQuestion && (
                <QuestionModal
                    topics={topics}
                    levels={levels}
                    title="Edit Question"
                    isOpen={editModal}
                    onSubmit={handleEdit}
                    isLoading={isLoading}
                    categories={categories}
                    initialData={editQuestion}
                    validOrInvalid={validOrInvalid}
                    onClose={() => { setEditModal(false); setValidOrInvalid({}) }}
                />
            )}
            {deleteModal && (
                <DeleteModal
                    title="Delete Question"
                    setDelete={confirmDelete}
                    setCancel={() => setDeleteModal(false)}
                    text="Once you delete the questions(s), they cannot be restored."
                />
            )}
        </div>
    );
}