import MainHub from "./Views/MainHub/MainHub"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TypeHubPage from "./Views/TypeHubPage/TypeHubPage";
const Hub = () => {
 

  return (
   <>

<Tabs className="w-full">
<TabList>
      <Tab>هاب</Tab>
      <Tab>گونه هاب</Tab>
     </TabList>


    <TabPanel> 
      {/* hub */}
    <MainHub/>  
    </TabPanel>

    <TabPanel> 
       {/*type hub */}
    <TypeHubPage/>
    </TabPanel>



</Tabs>


   
    </>
  );
};

export default Hub;
