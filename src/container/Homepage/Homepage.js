import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { useOutletStore } from "../../store/outletStore";

const { Header, Content, Footer, Sider } = Layout;

const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const App = () => {
  const contentRef = React.useRef(null);
  const { outletInfo, setOutletInfo } = useOutletStore();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  React.useEffect(() => {
    const element = contentRef?.current;

    if (!element) return;

    const observer = new ResizeObserver(() => {
      // 👉 Do something when the element is resized
      setOutletInfo({
        width: element.clientWidth,
        height: element.clientHeight,
      });
    });

    observer.observe(element);

    return () => {
      // Cleanup the observer by unobserving all elements
      observer.disconnect();
    };
  }, []);

  const menuList = [
    {
      key: "drawGround",
      label: <Link to="drawGround">Graw Ground</Link>,
    },
    {
      key: "cirlceGround",
      label: <Link to="cirlceGround">Circle Ground</Link>,
    },
    {
      key: "rectGround",
      label: <Link to="rectGround">Rect Ground</Link>,
    },
  ];

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={menuList}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: "48px",
        }}
      >
        <Layout
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Content
            style={{
              minHeight: "90vh",
            }}
            ref={contentRef}
          >
            <Outlet />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
export default App;
