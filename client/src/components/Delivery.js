import { Button, Modal } from 'antd';

const Delivery = () => {
    return (
        <div>
            <Modal
                title="Create new item"
                wrapClassName="vertical-center-modal"
                okText="Save new item"
                width="600"
                footer={[
                    <Button form="myForm" key="submit" htmlType="submit">
                        Submit
                    </Button>,
                ]}
            ></Modal>
        </div>
    );
};
export default Delivery;
