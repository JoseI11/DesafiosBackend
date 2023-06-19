import Router from "express"

const router=Router()

router.get("/loggerTest", (req, res) => {
    logger.debug("This is a debug log");
    logger.http("This is an HTTP log");
    logger.info("This is an info log");
    logger.warning("This is a warning log");
    logger.error("This is an error log");
    logger.fatal("This is a fatal log");

    res.send("Logger test completed");
});
export default router