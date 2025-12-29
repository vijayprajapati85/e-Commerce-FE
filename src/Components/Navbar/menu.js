
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getCategoryAll } from '../../apis/categoryApi';
import { RemoveSpecialChars } from "../../Helper/helper";
import './menu.css';

export const UserMenu = () => {

    const [datalist, setDataList] = useState([]);
    const navigate = useNavigate();

    const getCateogry = async () => {
        const response = await getCategoryAll();
        if (response != null && response.data != null) {
            setDataList(response.data);
        }
    }

    const onLinkClick = (subMenu, menuName, parentId, subId) => {
        
        const postData = {
            CatId: subId === undefined ? parentId : subId,
            SubCatId: subId !== undefined ? parentId : null,
        }
        navigate(menuName?`/${RemoveSpecialChars(menuName)}/${postData.CatId}/${RemoveSpecialChars(subMenu)}/${postData.SubCatId}`:`/${RemoveSpecialChars(subMenu)}/${postData.CatId}`);
    }

    useEffect(() => {
        getCateogry();
    }, []);

     // Recursive component to render submenus
  const RenderMenu = ({ items, menuName, CatId }) => (
    <ul className="nav-list">
      {items.map(item => (
        <li key={item.id} className={`nav-item ${item.subCategories?.length ? 'has-sub' : ''}`}>
          <a onClick={() => onLinkClick(item.name, menuName, item.id, CatId )}>{item.name}</a>
          {item.subCategories?.length > 0 && <RenderMenu items={item.subCategories} menuName={item.name} CatId={item.id} />}
        </li>
      ))}
    </ul>
  );
    return (<nav className="glass-nav">
        <RenderMenu items={datalist} />
    </nav>);
}

export const AdminMenu = () => {
  const navigate = useNavigate();
  return (
    <nav className="glass-nav">
      <ul className="nav-list">
        <li className="nav-item"><a onClick={() => navigate('/admin/dashboard')}>Dashboard</a></li>
        <li className="nav-item"><a onClick={() => navigate('/admin/products')}>Products</a></li>
      </ul></nav>
  );
}