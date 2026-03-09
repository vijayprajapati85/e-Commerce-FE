export const CustomNoDataComponent = ({ handleItemClick }) => {
    
  return (
    <div style={{ padding: '24px', textAlign: 'center' }}>
          <div className="subcat-list">
              <h3>No Data Found</h3>
              <i className="ri-add-box-fill" title="Add SubCategory" onClick={handleItemClick}></i>
          </div>

      <p>There are no subcategories to display at this time.</p>
    </div>
  );
};