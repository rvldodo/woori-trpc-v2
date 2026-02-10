import css from "@/components/loader/loading.module.css";

export default function LoadingComponent() {
  return (
    <section className="w-full min-h-screen flex justify-center items-center">
      <div className={css.loader} />
    </section>
  );
}
