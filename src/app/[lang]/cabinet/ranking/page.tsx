"use client";
import dynamic from "next/dynamic";
import { useProfileRanking } from "@features/cabinet/ranking/hooks/useRanking";
import { useElementHeights } from "@features/cabinet/hooks/useElementHeights";
const Empty = dynamic(() => import("@components/Empty"));
const Loader = dynamic(() => import("@components/Loader"));
const UserList = dynamic(() => import("@components/rankings/TableBody"));
const TableHeader = dynamic(() => import("@components/rankings/TableHeader"));
const TablePagination = dynamic(() => import("@components/rankings/TablePagination"));

const Users = () => {
    const { sortBy, isLoading, handlePageChange, totalPages, profileRanking, handleSortByChange } = useProfileRanking();
    const { elementRefs, heights } = useElementHeights(["element1", "element2"]);

    return (
        <div className="w-full h-full bg-[var(--whi)] dark:bg-[var(--darkBoxBg)]">
            <div ref={elementRefs.element1}>
                <TableHeader sortBy={sortBy} handleSortByChange={handleSortByChange} />
            </div>
            <div style={{ height: `calc(100% - ${heights.element1 + heights.element2}px)` }} className="overflow-y-auto scroll-bar-none w-full h-full" >
                {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <Loader style={{ width: "60px", padding: "5px", background: "var(--dark)" }} />
                    </div>
                ) : profileRanking.length ? (
                    profileRanking.map((user, index) => (
                        <UserList key={user.id} user={user} index={index} page={sortBy.page} sortBy={sortBy.sortBy} />
                    ))
                ) : <Empty />}
            </div>
            <div ref={elementRefs.element2}>
                <TablePagination page={sortBy.page} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default Users;