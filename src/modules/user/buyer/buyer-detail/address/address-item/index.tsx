import { Dropdown, Menu } from "antd";
import { CallIcon, ControlIcon, LocationIcon, PencilIcon } from "assets/icons";
import "./styles.scss";

interface AddressItemProps {
  user: string | undefined;
  phone: string | undefined;
  address: string | undefined;
  city: string | undefined;
  isDefault: string | undefined;
  onClickEdit: () => void;
  onClickSetAsDefault: () => void;
  onClickDelete: () => void;
}

export default function AddressItem(props: AddressItemProps) {
  const {
    user,
    phone,
    address,
    city,
    isDefault,
    onClickEdit,
    onClickSetAsDefault,
    onClickDelete
  } = props;
  const menu = (
    <Menu className="menu-control-address">
      <Menu.Item key="0">
        <div className="set-as-default" onClick={onClickSetAsDefault}>
          <p>Set as default</p>
        </div>
      </Menu.Item>
      <Menu.Item key="1">
        <div className="delete" onClick={onClickDelete}>
          <p>Delete</p>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="address-item-container">
      <div className="address-item-header">
        <div className="address-item-name">
          <p>{user}</p>
          {isDefault ? <div className="default">Default</div> : null}
        </div>
        <div className="address-item-control">
          <PencilIcon className="pencil-icon" onClick={onClickEdit} />
          <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
            <ControlIcon
              className="control-icon"
              onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
                e.preventDefault()
              }
            />
          </Dropdown>
        </div>
      </div>
      <div className="address-item-content">
        <div className="address-item-row">
          <CallIcon className="icon" />
          <p>{phone}</p>
        </div>
        <div className="address-item-row">
          <LocationIcon className="icon" />
          <div className="address-city">
            <div className="address">
              <p>{address}</p>
            </div>
            <div className="city">{city}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
