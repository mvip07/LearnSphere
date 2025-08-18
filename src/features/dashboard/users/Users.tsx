import React, { memo, useCallback } from 'react';
import { useUsers } from './hooks/useUsers';
import Loader from '@components/Loader';
import { TableFooter } from '@components/dashboard/TableFooter';
import { TableHeader } from '@components/dashboard/TableHeader';
import UserTable from './components/UserTable';
import Empty from '@components/Empty';
import UserModal from './components/UserModal';
import { DeleteModal } from '@components/dashboard/DeleteModal';
import UserSorted from './components/UserSorted';
import { User } from 'src/types/auth';

const Users: React.FC = () => {
    const {
        page,
        limit,
        search,
        filter,
        users,
        roles,
        isLoading,
        isLoadingPage,
        totalPages,
        createModal,
        editModal,
        deleteModal,
        editUser,
        checked,
        validOrInvalid,
        setChecked,
        setEditUser,
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
    } = useUsers();

    const handleEditClick = useCallback((user: User) => {
        setEditUser(user);
        setEditModal(true);
    }, [setEditUser, setEditModal]);

    const handleDeleteClick = useCallback((ids: string[]) => {
        setChecked(ids);
        setDeleteModal(true);
    }, [setChecked, setDeleteModal]);

    return (
        <div className={`h-full ${createModal || editModal ? 'overflow-hidden' : 'overflow-y-auto scroll-bar-none'}`}>
            <div className={`w-full p-4 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] ${createModal || editModal ? 'blur-sm overflow-hidden' : 'overflow-y-auto'}`}>
                <UserSorted filter={filter} roles={roles} updateFilterParam={updateFilterParam} />
                <TableHeader
                    limit={limit}
                    search={search}
                    btnTitle="Add User"
                    onLimitChange={changeLimitOrPageOrSearch}
                    onAddClick={() => setCreateModal(true)}
                />
                {isLoadingPage ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader style={{ width: '100px', padding: '10px', background: '#000' }} />
                    </div>
                ) : users.length > 0 ? (
                    <UserTable
                        checked={checked}
                        users={users}
                        setChecked={setChecked}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                    />
                ) : (
                    <Empty />
                )}
                <TableFooter page={page} onPrev={handlePrev} onNext={handleNext} totalPages={totalPages} />
            </div>
            <UserModal
                roles={roles}
                title="Add New User"
                isLoading={isLoading}
                isOpen={createModal}
                onSubmit={handleCreate}
                validOrInvalid={validOrInvalid}
                onClose={() => { setCreateModal(false); setValidOrInvalid({}) }}
            />
            {editUser && (
                <UserModal
                    roles={roles}
                    title="Edit User"
                    isOpen={editModal}
                    onSubmit={handleEdit}
                    isLoading={isLoading}
                    initialData={editUser}
                    validOrInvalid={validOrInvalid}
                    onClose={() => { setEditModal(false); setValidOrInvalid({}) }}
                />
            )}
            {deleteModal && (
                <DeleteModal
                    title="Delete Users"
                    setDelete={confirmDelete}
                    setCancel={() => setDeleteModal(false)}
                    text="Once you delete the user(s), they cannot be restored."
                />
            )}
        </div>
    );
};

export default memo(Users);