import { Select } from "@radix-ui/themes";

export const ShareUserDropDown = ({ filteredUserList }) => {
    return filteredUserList.map((userObject) => (
        <Select.Item
            key={`share-user-key-${userObject.id}`}
            value={userObject?.id}
        >
            {userObject?.fullName}
        </Select.Item>
    ));
};
