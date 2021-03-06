import { Sequelize } from "sequelize";

const { PGHOST, PGUSER, PGPORT, PGPASSWORD, PGDATABASE } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: "postgres",
});

export const testDB = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.log(error);
  }
};

export default sequelize;
