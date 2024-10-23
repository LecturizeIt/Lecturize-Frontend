import styles from "./Metric.module.css";


export type MetricProps = {
  icon: React.ReactNode;
  metric: number | null;
  text: string;
  className?: string;
};

export const Metric = ({ icon, metric, text }: MetricProps): JSX.Element => {
  const displayMetric = metric == null || metric === 0 ? "-" : metric;

  return (
    <div className={`${styles.metric} ${styles["metric-border"]} flex flex-col items-start p-3`}>
      {icon && <span>{icon}</span>}
      
      <p className="font-semibold text-[42px] text-[#6d6d6d]">{displayMetric}</p>
      <p className="text-[#6d6d6d] text-[14px] font-bold">{text}</p>
    </div>
  );
};