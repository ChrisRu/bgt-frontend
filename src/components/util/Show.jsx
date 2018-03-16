const Show = ({ visible, render }) => (visible ? render() : null);

export default Show;
