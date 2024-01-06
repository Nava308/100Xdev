public static CompletableFuture<Boolean> init(JsonObject config) {
    long start = System.currentTimeMillis();
    String applicationId;
    String applicationSecret;
    String applicationSecretVersion;
    String logAppenderType;
    String oneIdentityBootstrapUrl;
    String oneIdentityBootstrapUrlTimeoutMs;
    CompletableFuture<Boolean> completableFuture = new CompletableFuture<>();
    try {
        if (config == null || config.isEmpty()) {
            logger.logInfo("Config is null .... " + config);
            throw new IllegalStateException("OneIdentity Configuration Not available");
        }
    JsonObject oneIdentityConfig = config.getJsonObject("oneidentity");
//applicationId = oneIdentityConfig.getString(OneIdentityConstants.APP_ID);
//applicationSecret = oneIdentityConfig.getString(OneIdentityConstants.APP_SECRET);
applicationId = FileUtils.readFileToString(new File(oneIdentityConfig.getString(OneIdentityConstants.APP_ID)), "UTF-8");
applicationSecret = FileUtils.readFileToString(new File(oneIdentityConfig.getString(OneIdentityConstants.APP_SECRET)), "UTF-8");
applicationSecretVersion = oneIdentityConfig.getString(OneIdentityConstants.APP_SECRET_VERSION);
logAppenderType = oneIdentityConfig.getString(OneIdentityConstants.LOG_APPENDER_TYPE);
oneIdentityBootstrapUrl = oneIdentityConfig.getString(OneIdentityConstants.ONEIDENTITY_BOOTSTRAP_URL);
oneIdentityBootstrapUrlTimeoutMs = oneIdentityConfig.getString(OneIdentityConstants.ONEIDENTITY_BOOTSTRAP_TIMEOUT_MS);
ClientInitAttributesBean attBean = new ClientInitAttributesBean(applicationId, applicationSecret, applicationSecretVersion, logAppenderType, oneIdentityBootstrapUrlTimeoutMs);
attBean.verifyInitParameters();
ClientInitAttributeStore.getInstance().initialize(attBean);
logger.logInfo("Init param verification done .... ");
IdentityClientLogger.setWebStartInfo("IdpClientEAGCallout", "authorization", applicationId, logAppenderType);
ApplicationIDSignGeneration idSignature = ApplicationIDSignGeneration.getInstance();
idSignature.initialize(attBean);
logger.logInfo("Init done ");
string typ = oneIdentityConfig.getString(OneIdentityConstants.LOG_APPENDER_TYPE);
if (StringUtils.isNotBlank(oneIdentityBootstrapUrl)) {
    IdentityClientProperties.getInstance().setProperty(OneIdentityConstants.CBIS_BOOTSTRAP_URL, oneIdentityBootstrapUrl);
}

BootstrapManager bootstrapManager = new CBISBootstrapManager();
logger.logInfo("Bootstrapping .... ");
bootstrapManager.bootstrap();
logger.logInfo("Bootstrapping completed in " + (System.currentTimeMillis() - start) + " ms.");
String jarVersion = IdentityClientProperties.getInstance().getProperty(IdentityClientConstants.CLIENT_VERSION);
    String clientId = IdentityClientProperties.getInstance().getProperty(IdentityClientConstants.CLIENT_ID);
    String signatureVersion = IdentityClientProperties.getInstance().getProperty(IdentityClientConstants.SIGNATURE_VERSION);
    logger.logInfo("IDC versions -> " + "ClientId: " + clientId +  " - SignatureVersion: " + signatureVersion + " - Jar version: " + jarVersion);

    completableFuture.complete(true);
}
catch(IdentityClientException identityClientException) {
            logger.logError(identityClientException.getMessage(),identityClientException);
            completableFuture.completeExceptionally(identityClientException);
        }
        catch(Exception exception) {
            logger.logError(exception.getMessage(),exception);
            completableFuture.completeExceptionally(exception);
        }
        return completableFuture;
    }

}