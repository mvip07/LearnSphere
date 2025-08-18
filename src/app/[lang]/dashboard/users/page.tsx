"use client";
import Users from "@features/dashboard/users/Users";

export default function UsersPage() {
    return <Users />;
}
{/* <div onDoubleClick={() => setUserCreateModal(false)} className={`w-full h-full outline-0 scroll-bar-none box-shadow  ${userCreateModal ? "blur-sm overflow-hidden" : "blur-none overflow-y-auto"}`}>
  <div className="grid grid-cols-8 gap-4 mb-4 ">
    <div className="col-span-8 sm:col-span-4 xl:col-span-2 p-4 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] box-shadow">
      <div className="flex items-start justify-between">
        <div>
          <span className="block text-[12px] text-[var(--dark)] dark:text-[var(--whi)] font-medium leading-normal capitalize">Session</span>
          <h3 className="block text-[18px] text-[var(--dark)] dark:text-[var(--whi)] font-medium leading-normal capitalize my-2">
            21,459 <span className="text-[var(--green)]">(+29%)</span>
          </h3>
          <p className="block text-[12px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium leading-normal capitalize">Total Users</p>
        </div>
        <div className="w-10 h-10 rounded flex items-center justify-center">
          <FaUsers className="size-7 text-[var(--dark)] dark:text-[var(--whi)]" />
        </div>
      </div>
    </div>
    <div className="col-span-8 sm:col-span-4 xl:col-span-2 p-4 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] box-shadow">
      <div className="flex items-start justify-between">
        <div>
          <span className="block text-[12px] text-[var(--dark)] dark:text-[var(--whi)] font-medium leading-normal capitalize">Session</span>
          <h3 className="block text-[18px] text-[var(--dark)] dark:text-[var(--whi)] font-medium leading-normal capitalize my-2">
            21,459 <span className="text-[var(--green)]">(+29%)</span>
          </h3>
          <p className="block text-[12px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium leading-normal capitalize">Total Users</p>
        </div>
        <div className="w-10 h-10 rounded flex items-center justify-center">
          <FaUsers className="size-7 text-[var(--dark)] dark:text-[var(--whi)]" />
        </div>
      </div>
    </div>
    <div className="col-span-8 sm:col-span-4 xl:col-span-2 p-4 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] box-shadow">
      <div className="flex items-start justify-between">
        <div>
          <span className="block text-[12px] text-[var(--dark)] dark:text-[var(--whi)] font-medium leading-normal capitalize">Session</span>
          <h3 className="block text-[18px] text-[var(--dark)] dark:text-[var(--whi)] font-medium leading-normal capitalize my-2">
            21,459 <span className="text-[var(--green)]">(+29%)</span>
          </h3>
          <p className="block text-[12px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium leading-normal capitalize">Total Users</p>
        </div>
        <div className="w-10 h-10 rounded flex items-center justify-center">
          <FaUsers className="size-7 text-[var(--dark)] dark:text-[var(--whi)]" />
        </div>
      </div>
    </div>
    <div className="col-span-8 sm:col-span-4 xl:col-span-2 p-4 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] box-shadow">
      <div className="flex items-start justify-between">
        <div>
          <span className="block text-[12px] text-[var(--dark)] dark:text-[var(--whi)] font-medium leading-normal capitalize">Session</span>
          <h3 className="block text-[18px] text-[var(--dark)] dark:text-[var(--whi)] font-medium leading-normal capitalize my-2">
            21,459 <span className="text-[var(--green)]">(+29%)</span>
          </h3>
          <p className="block text-[12px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium leading-normal capitalize">Total Users</p>
        </div>
        <div className="w-10 h-10 rounded flex items-center justify-center">
          <FaUsers className="size-7 text-[var(--dark)] dark:text-[var(--whi)]" />
        </div>
      </div>
    </div>
  </div>

  <div className="w-full p-4 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] ">
    <div className="table-header w-full">
      <div className="w-full grid grid-cols-10 items-center gap-4">
        <div className="col-span-5 sm:col-span-3 xl:col-span-2">
          <select
            name="block"
            value={filters.block}
            onChange={handleFilterChange}
            className="input w-full outline-0"
          >
            <option value="all">-All Block-</option>
            <option value="true">Blocked</option>
            <option value="false">Unblocked</option>
          </select>
        </div>
        <div className="col-span-5 sm:col-span-4 xl:col-span-2">
          <select
            name="isVerified"
            value={filters.isVerified}
            onChange={handleFilterChange}
            className="input w-full outline-0"
          >
            <option value="all">-All Verified-</option>
            <option value="true">Verified</option>
            <option value="false">No Verified</option>
          </select>
        </div>
        <div className="col-span-5 sm:col-span-3 xl:col-span-2">
          <select
            name="totalCoins"
            onChange={handleFilterChange}
            value={sortOptions.totalCoins}
            className="input w-full outline-0"
          >
            <option value="all">-All Coins-</option>
            <option value="desc">(High to Low)</option>
            <option value="asc">(Low to High)</option>
          </select>
        </div>
        <div className="col-span-5 sm:col-span-5 xl:col-span-2">
          <select
            name="followers"
            onChange={handleFilterChange}
            value={sortOptions.followers}
            className="input w-full outline-0"
          >
            <option value="all">-All Followers-</option>
            <option value="desc">(High to Low)</option>
            <option value="asc">(Low to High)</option>
          </select>
        </div>
        <div className="col-span-10 sm:col-span-5 xl:col-span-2">
          <select
            name="roles"
            value={filters.roles}
            onChange={handleFilterChange}
            className="input w-full outline-0"
          >
            <option value="all">-All Roles-</option>
            {roles.map((role, index) => (
              <option key={index} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] my-4"></div>

      <div className="w-full block sm:flex items-center justify-between items-center gap-4">
        <div className="limit">
          <select
            value={currentLimit}
            className="input outline-0"
            onChange={(e) => { setCurrentLimit(Number(e.target.value)); setCurrentPage(1) }}
          >
            {[5, 10, 15, 20, 30, 40, 50].map(limit => (
              <option key={limit} value={limit}>{limit}</option>
            ))}
          </select>
        </div>
        <div className="w-full flex items-center justify-end gap-4 mt-4 sm:mt-0">
          <input onChange={(e) => handleSearch(e.target.value)} className="outline-0 input w-full sm:w-min" type="text" placeholder="Enter your user..." />
          <button onClick={() => setUserCreateModal(true)} className="flex items-center justify-center gap-3 rounded-lg py-4 sm:py-3 px-4 outline-0 text-[var(--whi)] text-[16px] font-medium leading-normal bg-[var(--primary)]">
            <FaUserPlus className="size-5 text-[var(--whi)] dark:text-[var(--whi)]" /> <p className="hidden sm:block"> Add Users</p>
          </button>
        </div>
      </div>
    </div>

    <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] my-4"></div>

    <div className="overflow-x-auto">
      <div className="w-full min-w-[2500px]">
        <div className="w-full grid grid-cols-16 gap-4">
          <div className="col-span-1">
            <label className="flex items-center cursor-pointer gap-2">
              <input type="checkbox" className="peer hidden input" />

              <div className="check-icon-bg min-w-6 min-h-6 border border-[var(--whiLg)] dark:border-[var(--darkInputBorder)] rounded-md flex items-center justify-center peer-checked:bg-[var(--primary)] transition-all duration-200">
                <FaCheck className="check-icon text-[var(--whi)] size-4 " />
              </div>
            </label>
          </div>
          <div className="col-span-2">
            <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">User</p>
          </div>
          <div className="col-span-2">
            <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">Email</p>
          </div>
          <div className="col-span-1">
            <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">Status</p>
          </div>
          <div className="col-span-1">
            <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">isVerified</p>
          </div>
          <div className="col-span-1">
            <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">Verification</p>
          </div>
          <div className="col-span-2">
            <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">BIO</p>
          </div>
          <div className="col-span-1">
            <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">Coins</p>
          </div>
          <div className="col-span-1">
            <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">Followers</p>
          </div>
          <div className="col-span-1">
            <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">Roles</p>
          </div>
          <div className="col-span-1">
            <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">CreatedAt</p>
          </div>
          <div className="col-span-1">
            <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">UpdatedAt</p>
          </div>
          <div className="col-span-1">
            <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal text-end">Actions</p>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] mt-4"></div>

        {isLoading && (
          <div className="p-4 text-center text-[var(--primary)]">Yuklanmoqda...</div>
        )}
        {!isLoading && notFound && (
          <div className="p-4 text-center text-[var(--textCl)] dark:text-[var(--darkTextCl)]">Hech narsa topilmadi</div>
        )}
        {!isLoading && !notFound && users && users.map((user, index) => (
          <div key={index} className="w-full grid grid-cols-16 items-center gap-4 border-b border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] cursor-pointer py-1">
            <div className="col-span-1">
              <label className="flex items-center cursor-pointer gap-2">
                <input type="checkbox" className="peer hidden input" />

                <div className="check-icon-bg min-w-6 min-h-6 border border-[var(--whiLg)] dark:border-[var(--darkInputBorder)] rounded-md flex items-center justify-center peer-checked:bg-[var(--primary)] transition-all duration-200">
                  <FaCheck className="check-icon text-[var(--whi)] size-4 " />
                </div>
              </label>
            </div>

            <div className="col-span-2">
              <div className="flex gap-2 items-center">
                <a href={`users/detail/${user.id}`}>
                  <img className="w-9 h-9 rounded-full" src={host + "/uploads/users/" + user.image} alt="" />
                </a>
                <div>
                  <div className="flex items-center gap-2">
                    <p title={user.firstname} className="text-[15px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium capitalize">
                      {user.firstname.length > 20 ? user.firstname.slice(0, 17) + "..." : user.firstname}
                    </p>
                    <p title={user.lastname} className="text-[15px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium capitalize">
                      {user.lastname.length > 20 ? user.lastname.slice(0, 17) + "..." : user.lastname}
                    </p>
                  </div>
                  <p title={user.username} className="text-[13px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium">
                    @{user.username.length > 20 ? user.username.slice(0, 17) + "..." : user.username}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <p title={user.email} className="text-[16px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium">
                {user.email}
              </p>
            </div>

            <div className="col-span-1">
              <p title={String(user.block)} className={`w-min text-[14px] text-[var(--whi)] leading-normal font-medium rounded-md py-1 px-2 ${user.block ? 'bg-[var(--red)]' : 'bg-[var(--green)]'}`}>
                {user.block ? "Blocked" : "Unblocked"}
              </p>
            </div>

            <div className="col-span-1">
              <p title={String(user.isVerified)} className={`w-min text-[14px] text-[var(--whi)] leading-normal font-medium rounded-md py-1 px-2 ${user.isVerified ? 'bg-[var(--green)]' : 'bg-[var(--yellow)]'}`}>
                {user.isVerified ? "Verified" : "NoVerified"}
              </p>
            </div>

            <div className="col-span-1">
              <p title={user.verificationCode} className="text-[16px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium">
                {user.verificationCode}
              </p>
            </div>

            <div className="col-span-2">
              <p title={user.bio} className="text-[16px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium">
                {user.bio.length >= 35 ? user.bio.slice(0, 35) + "..." : user.bio}
              </p>
            </div>

            <div className="col-span-1">
              <p title={String(user.totalCoins)} className="text-[16px] text-[var(--firstPlace)] leading-normal font-medium">
                {user.totalCoins} 🟡
              </p>
            </div>

            <div className="col-span-1">
              <p title={user.followers} className="text-[16px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium">
                {user.followers}
              </p>
            </div>

            <div className="col-span-1">
              <p title={user.roles} className="text-[16px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium">
                {user.roles}
              </p>
            </div>

            <div className="col-span-1">
              <p title={user.createdAt} className="text-[16px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium text-start whitespace-nowrap">
                {user.createdAt.slice(0, 10) + " " + user.createdAt.slice(11, 19)}
              </p>
            </div>

            <div className="col-span-1">
              <p title={user.updatedAt} className="text-[16px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium text-start whitespace-nowrap">
                {user.updatedAt.slice(0, 10) + " " + user.updatedAt.slice(11, 19)}
              </p>
            </div>

            <div className="col-span-1">
              <div className="flex items-center justify-end gap-1">
                <div className="item w-9 h-9 rounded-full hover:bg-[var(--whiLg)] hover:dark:bg-[var(--darkBorderCl)] flex items-center justify-center">
                  <FaTrashCan className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                </div>
                <div className="item w-9 h-9 rounded-full hover:bg-[var(--whiLg)] hover:dark:bg-[var(--darkBorderCl)] flex items-center justify-center">
                  <FaEye className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                </div>
                <div className="item w-9 h-9 rounded-full hover:bg-[var(--whiLg)] hover:dark:bg-[var(--darkBorderCl)] flex items-center justify-center">
                  <FaEllipsisVertical className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="table-footer flex items-center justify-end mt-4 gap-2">
      <button
        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        disabled={currentPage === 1 || isLoading}
        className="flex items-center justify-center gap-5 rounded-md px-3 py-2 md:py-3 outline-0 text-[var(--whi)] text-[16px] font-medium leading-normal bg-[var(--primary)] disabled:opacity-50"
      >
        <FaLeftLong />
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button
        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages || isLoading}
        className="flex items-center justify-center gap-5 rounded-md px-3 py-2 md:py-3 outline-0 text-[var(--whi)] text-[16px] font-medium leading-normal bg-[var(--primary)] disabled:opacity-50"
      >
        <FaRightLong />
      </button>
    </div>
  </div>
</div>

<div className={`fixed top-[66px] h-[calc(100dvh-66px)] lg:top-[77px] lg:h-[calc(100dvh-77px)] w-full sm:w-96 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] z-[1000] overflow-y-auto border-t border-s border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] delay-100 duration-500 ${userCreateModal ? "end-0" : "-end-[500px]"}`}>
  <div className="header sticky top-0 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] flex items-center justify-between p-4 border-b border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">
    <h3 className="text-[var(--dark)] dark:text-[var(--whi)] text-[18px] font-medium leading-normal capitalize">Add New User</h3>
    <div onClick={() => setUserCreateModal(false)} className="item w-10 h-10 rounded-full hover:bg-[var(--whiLg)] hover:dark:bg-[var(--darkBorderCl)] flex items-center justify-center cursor-pointer">
      <FaXmark className="size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
    </div>
  </div>
  <div className="body p-4">
    <div className="form-group my-3">
      <label className="block text-[var(--dark)] text-[16px] dark:text-[var(--whi)] leading-normal font-medium capitalize cursor-pointer" htmlFor="firstname">First Name</label>
      <input className="input w-full outline-0 !py-2 mt-2" type="text" placeholder="Enter your First name" id="firstname" name="firstname" />
    </div>

    <div className="form-group my-3">
      <label className="block text-[var(--dark)] text-[16px] dark:text-[var(--whi)] leading-normal font-medium capitalize cursor-pointer" htmlFor="lastname">Last Name</label>
      <input className="input w-full outline-0 !py-2 mt-2" type="text" placeholder="Enter your Last name" id="lastname" name="lastname" />
    </div>

    <div className="form-group my-3">
      <label className="block text-[var(--dark)] text-[16px] dark:text-[var(--whi)] leading-normal font-medium capitalize cursor-pointer" htmlFor="username">Email</label>
      <input className="input w-full outline-0 !py-2 mt-2" type="text" placeholder="Enter your Username" id="username" name="username" />
    </div>

    <div className="form-group my-3">
      <label className="block text-[var(--dark)] text-[16px] dark:text-[var(--whi)] leading-normal font-medium capitalize cursor-pointer" htmlFor="email">Email</label>
      <input className="input w-full outline-0 !py-2 mt-2" type="email" placeholder="Enter your Email" id="email" name="email" />
    </div>

    <div className="form-group my-3">
      <label className="block text-[var(--dark)] text-[16px] dark:text-[var(--whi)] leading-normal font-medium capitalize cursor-pointer" htmlFor="block">Block</label>
      <label className="flex items-center cursor-pointer gap-2 mt-2" htmlFor="block">
        <input type="checkbox" className="peer hidden input" id="block" name="block" />
        <div className="check-icon-bg min-w-6 min-h-6 border border-[var(--whiLg)] dark:border-[var(--darkInputBorder)] rounded-md flex items-center justify-center peer-checked:bg-[var(--primary)] transition-all duration-200">
          <FaCheck className="check-icon text-[var(--whi)] size-4 " />
        </div>
      </label>
    </div>

    <div className="form-group my-3">
      <label className="block text-[var(--dark)] text-[16px] dark:text-[var(--whi)] leading-normal font-medium capitalize cursor-pointer" htmlFor="isverified">is verified</label>
      <label className="flex items-center cursor-pointer gap-2 mt-2" htmlFor="isverified">
        <input type="checkbox" className="peer hidden input" name="isverified" id="isverified" />
        <div className="check-icon-bg min-w-6 min-h-6 border border-[var(--whiLg)] dark:border-[var(--darkInputBorder)] rounded-md flex items-center justify-center peer-checked:bg-[var(--primary)] transition-all duration-200">
          <FaCheck className="check-icon text-[var(--whi)] size-4 " />
        </div>
      </label>
    </div>

    <div className="form-group my-3">
      <label className="block text-[var(--dark)] text-[16px] dark:text-[var(--whi)] leading-normal font-medium capitalize cursor-pointer" htmlFor="bio">Bio</label>
      <textarea className="input w-full outline-0 !py-2 mt-2" rows={5} placeholder="Enter your Bio" id="bio" name="bio" />
    </div>

    <div className="form-group my-3">
      <label className="block text-[var(--dark)] text-[16px] dark:text-[var(--whi)] leading-normal font-medium capitalize cursor-pointer" htmlFor="bio">Roles</label>
      <select className="input w-full outline-0 !py-2 mt-2" >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>

    <div className="form-group my-3">
      <label className="block text-[var(--dark)] text-[16px] dark:text-[var(--whi)] leading-normal font-medium capitalize cursor-pointer" htmlFor="image">User Image</label>
      <label htmlFor="image">
        <div className="w-full bg-[var(--lg)] dark:bg-[var(--darkBorderCl)] py-7 px-4 mt-2 rounded-sm text-center border border-[var(--primary)] border-dashed cursor-pointer">
          <div className="w-[40px] h-[40px] bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] rounded-full mx-auto flex items-center justify-center cursor-pointer">
            <FaUpload className="size-5 text-[var(--primary)]" />
          </div>

          <p className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium leading-normal mt-4">
            <a className="text-[var(--primary)]" href="#">Click to upload</a> or drag and drop <br /> SVG, PNG, JPG or GIF <br /> (max, 800 X 800px)
          </p>
        </div>
      </label>
      <input type="file" className="file-upload hidden" id="image" name="image" />
    </div>
  </div>
  <div className="footer sticky bottom-0 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] flex items-center gap-4 p-4 border-t border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">
    <button className="text-[16px] text-[var(--whi)] bg-[var(--primary)] font-medium leading-normal capitilize py-2 px-4 rounded cursor-pointer select-none">Submit</button>
    <button onClick={() => setUserCreateModal(false)} className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] font-medium leading-normal capitilize py-2 px-4 rounded cursor-pointer select-none border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">Cancel</button>
  </div>
</div> */}