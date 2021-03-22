import { PageWrapper } from "../CreatePage/CreatePage";
import { CanvasJSChart } from "canvasjs-react-charts";
import { useStateContext } from "../../Context/useStateContext";
import { categories } from "../../Context/initialProducts";

const StatsPage: React.FC = () => {
   const [state] = useStateContext();
   const options = {
      title: {
         text: "Products Sale Chart",
      },
      data: [
         {
            type: "column",
            dataPoints: categories.map((c) => {
               return {
                  label: c.name,
                  y: state.products.filter((p) => p.category.id === c.id)
                     .length,
               };
            }),
         },
      ],
   };
   return (
      <PageWrapper>
         <CanvasJSChart options={options}></CanvasJSChart>
      </PageWrapper>
   );
};

export default StatsPage;
