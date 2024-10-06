import PopupModal from '@/components/shared/popup-modal';
import TableSearchInput from '@/components/shared/table-search-input';
import MemberCreateForm from '../member-forms/member-create-form';

export default function MemberTableActions() {
  return (
    <div className="flex items-center justify-between gap-2 py-5">
      <div className="flex flex-1 gap-4">
        <TableSearchInput placeholder="Search People Here" />
      </div>
      <div className="flex gap-3">
        <PopupModal
          renderModal={(onClose) => <MemberCreateForm modalClose={onClose} />}
        />
      </div>
    </div>
  );
}
