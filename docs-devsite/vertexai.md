Project: /docs/reference/js/_project.yaml
Book: /docs/reference/_book.yaml
page_type: reference

{% comment %}
DO NOT EDIT THIS FILE!
This is generated by the JS SDK team, and any local changes will be
overwritten. Changes should be made in the source code at
https://github.com/firebase/firebase-js-sdk
{% endcomment %}

# vertexai package
The Vertex AI in Firebase Web SDK.

## Functions

|  Function | Description |
|  --- | --- |
|  <b>function(app, ...)</b> |
|  [getVertexAI(app, options)](./vertexai.md#getvertexai_04094cf) | Returns a [VertexAI](./vertexai.vertexai.md#vertexai_interface) instance for the given app. |
|  <b>function(vertexAI, ...)</b> |
|  [getGenerativeModel(vertexAI, modelParams, requestOptions)](./vertexai.md#getgenerativemodel_e3037c9) | Returns a [GenerativeModel](./vertexai.generativemodel.md#generativemodel_class) class with methods for inference and other functionality. |
|  [getImagenModel(vertexAI, modelParams, requestOptions)](./vertexai.md#getimagenmodel_812c375) | <b><i>(Public Preview)</i></b> Returns an [ImagenModel](./vertexai.imagenmodel.md#imagenmodel_class) class with methods for using Imagen.<!-- -->Only Imagen 3 models (named <code>imagen-3.0-*</code>) are supported. |

## Classes

|  Class | Description |
|  --- | --- |
|  [ArraySchema](./vertexai.arrayschema.md#arrayschema_class) | Schema class for "array" types. The <code>items</code> param should refer to the type of item that can be a member of the array. |
|  [BooleanSchema](./vertexai.booleanschema.md#booleanschema_class) | Schema class for "boolean" types. |
|  [ChatSession](./vertexai.chatsession.md#chatsession_class) | ChatSession class that enables sending chat messages and stores history of sent and received messages so far. |
|  [GenerativeModel](./vertexai.generativemodel.md#generativemodel_class) | Class for generative model APIs. |
|  [ImagenImageFormat](./vertexai.imagenimageformat.md#imagenimageformat_class) | <b><i>(Public Preview)</i></b> Defines the image format for images generated by Imagen.<!-- -->Use this class to specify the desired format (JPEG or PNG) and compression quality for images generated by Imagen. This is typically included as part of [ImagenModelParams](./vertexai.imagenmodelparams.md#imagenmodelparams_interface)<!-- -->. |
|  [ImagenModel](./vertexai.imagenmodel.md#imagenmodel_class) | <b><i>(Public Preview)</i></b> Class for Imagen model APIs.<!-- -->This class provides methods for generating images using the Imagen model. |
|  [IntegerSchema](./vertexai.integerschema.md#integerschema_class) | Schema class for "integer" types. |
|  [NumberSchema](./vertexai.numberschema.md#numberschema_class) | Schema class for "number" types. |
|  [ObjectSchema](./vertexai.objectschema.md#objectschema_class) | Schema class for "object" types. The <code>properties</code> param must be a map of <code>Schema</code> objects. |
|  [Schema](./vertexai.schema.md#schema_class) | Parent class encompassing all Schema types, with static methods that allow building specific Schema types. This class can be converted with <code>JSON.stringify()</code> into a JSON string accepted by Vertex AI REST endpoints. (This string conversion is automatically done when calling SDK methods.) |
|  [StringSchema](./vertexai.stringschema.md#stringschema_class) | Schema class for "string" types. Can be used with or without enum values. |
|  [VertexAIError](./vertexai.vertexaierror.md#vertexaierror_class) | Error class for the Vertex AI in Firebase SDK. |
|  [VertexAIModel](./vertexai.vertexaimodel.md#vertexaimodel_class) | Base class for Vertex AI in Firebase model APIs. |

## Enumerations

|  Enumeration | Description |
|  --- | --- |
|  [BlockReason](./vertexai.md#blockreason) | Reason that a prompt was blocked. |
|  [FinishReason](./vertexai.md#finishreason) | Reason that a candidate finished. |
|  [FunctionCallingMode](./vertexai.md#functioncallingmode) |  |
|  [HarmBlockMethod](./vertexai.md#harmblockmethod) |  |
|  [HarmBlockThreshold](./vertexai.md#harmblockthreshold) | Threshold above which a prompt or candidate will be blocked. |
|  [HarmCategory](./vertexai.md#harmcategory) | Harm categories that would cause prompts or candidates to be blocked. |
|  [HarmProbability](./vertexai.md#harmprobability) | Probability that a prompt or candidate matches a harm category. |
|  [HarmSeverity](./vertexai.md#harmseverity) | Harm severity levels. |
|  [ImagenAspectRatio](./vertexai.md#imagenaspectratio) | <b><i>(Public Preview)</i></b> Aspect ratios for Imagen images.<!-- -->To specify an aspect ratio for generated images, set the <code>aspectRatio</code> property in your [ImagenGenerationConfig](./vertexai.imagengenerationconfig.md#imagengenerationconfig_interface)<!-- -->.<!-- -->See the the [documentation](http://firebase.google.com/docs/vertex-ai/generate-images) for more details and examples of the supported aspect ratios. |
|  [ImagenPersonFilterLevel](./vertexai.md#imagenpersonfilterlevel) | <b><i>(Public Preview)</i></b> A filter level controlling whether generation of images containing people or faces is allowed.<!-- -->See the <a href="http://firebase.google.com/docs/vertex-ai/generate-images">personGeneration</a> documentation for more details. |
|  [ImagenSafetyFilterLevel](./vertexai.md#imagensafetyfilterlevel) | <b><i>(Public Preview)</i></b> A filter level controlling how aggressively to filter sensitive content.<!-- -->Text prompts provided as inputs and images (generated or uploaded) through Imagen on Vertex AI are assessed against a list of safety filters, which include 'harmful categories' (for example, <code>violence</code>, <code>sexual</code>, <code>derogatory</code>, and <code>toxic</code>). This filter level controls how aggressively to filter out potentially harmful content from responses. See the [documentation](http://firebase.google.com/docs/vertex-ai/generate-images) and the [Responsible AI and usage guidelines](https://cloud.google.com/vertex-ai/generative-ai/docs/image/responsible-ai-imagen#safety-filters) for more details. |
|  [Modality](./vertexai.md#modality) | Content part modality. |
|  [SchemaType](./vertexai.md#schematype) | Contains the list of OpenAPI data types as defined by the [OpenAPI specification](https://swagger.io/docs/specification/data-models/data-types/) |
|  [VertexAIErrorCode](./vertexai.md#vertexaierrorcode) | Standardized error codes that [VertexAIError](./vertexai.vertexaierror.md#vertexaierror_class) can have. |

## Interfaces

|  Interface | Description |
|  --- | --- |
|  [BaseParams](./vertexai.baseparams.md#baseparams_interface) | Base parameters for a number of methods. |
|  [Citation](./vertexai.citation.md#citation_interface) | A single citation. |
|  [CitationMetadata](./vertexai.citationmetadata.md#citationmetadata_interface) | Citation metadata that may be found on a [GenerateContentCandidate](./vertexai.generatecontentcandidate.md#generatecontentcandidate_interface)<!-- -->. |
|  [Content](./vertexai.content.md#content_interface) | Content type for both prompts and response candidates. |
|  [CountTokensRequest](./vertexai.counttokensrequest.md#counttokensrequest_interface) | Params for calling [GenerativeModel.countTokens()](./vertexai.generativemodel.md#generativemodelcounttokens) |
|  [CountTokensResponse](./vertexai.counttokensresponse.md#counttokensresponse_interface) | Response from calling [GenerativeModel.countTokens()](./vertexai.generativemodel.md#generativemodelcounttokens)<!-- -->. |
|  [CustomErrorData](./vertexai.customerrordata.md#customerrordata_interface) | Details object that contains data originating from a bad HTTP response. |
|  [Date\_2](./vertexai.date_2.md#date_2_interface) | Protobuf google.type.Date |
|  [EnhancedGenerateContentResponse](./vertexai.enhancedgeneratecontentresponse.md#enhancedgeneratecontentresponse_interface) | Response object wrapped with helper methods. |
|  [ErrorDetails](./vertexai.errordetails.md#errordetails_interface) | Details object that may be included in an error response. |
|  [FileData](./vertexai.filedata.md#filedata_interface) | Data pointing to a file uploaded on Google Cloud Storage. |
|  [FileDataPart](./vertexai.filedatapart.md#filedatapart_interface) | Content part interface if the part represents [FileData](./vertexai.filedata.md#filedata_interface) |
|  [FunctionCall](./vertexai.functioncall.md#functioncall_interface) | A predicted [FunctionCall](./vertexai.functioncall.md#functioncall_interface) returned from the model that contains a string representing the [FunctionDeclaration.name](./vertexai.functiondeclaration.md#functiondeclarationname) and a structured JSON object containing the parameters and their values. |
|  [FunctionCallingConfig](./vertexai.functioncallingconfig.md#functioncallingconfig_interface) |  |
|  [FunctionCallPart](./vertexai.functioncallpart.md#functioncallpart_interface) | Content part interface if the part represents a [FunctionCall](./vertexai.functioncall.md#functioncall_interface)<!-- -->. |
|  [FunctionDeclaration](./vertexai.functiondeclaration.md#functiondeclaration_interface) | Structured representation of a function declaration as defined by the [OpenAPI 3.0 specification](https://spec.openapis.org/oas/v3.0.3)<!-- -->. Included in this declaration are the function name and parameters. This <code>FunctionDeclaration</code> is a representation of a block of code that can be used as a Tool by the model and executed by the client. |
|  [FunctionDeclarationsTool](./vertexai.functiondeclarationstool.md#functiondeclarationstool_interface) | A <code>FunctionDeclarationsTool</code> is a piece of code that enables the system to interact with external systems to perform an action, or set of actions, outside of knowledge and scope of the model. |
|  [FunctionResponse](./vertexai.functionresponse.md#functionresponse_interface) | The result output from a [FunctionCall](./vertexai.functioncall.md#functioncall_interface) that contains a string representing the [FunctionDeclaration.name](./vertexai.functiondeclaration.md#functiondeclarationname) and a structured JSON object containing any output from the function is used as context to the model. This should contain the result of a [FunctionCall](./vertexai.functioncall.md#functioncall_interface) made based on model prediction. |
|  [FunctionResponsePart](./vertexai.functionresponsepart.md#functionresponsepart_interface) | Content part interface if the part represents [FunctionResponse](./vertexai.functionresponse.md#functionresponse_interface)<!-- -->. |
|  [GenerateContentCandidate](./vertexai.generatecontentcandidate.md#generatecontentcandidate_interface) | A candidate returned as part of a [GenerateContentResponse](./vertexai.generatecontentresponse.md#generatecontentresponse_interface)<!-- -->. |
|  [GenerateContentRequest](./vertexai.generatecontentrequest.md#generatecontentrequest_interface) | Request sent through [GenerativeModel.generateContent()](./vertexai.generativemodel.md#generativemodelgeneratecontent) |
|  [GenerateContentResponse](./vertexai.generatecontentresponse.md#generatecontentresponse_interface) | Individual response from [GenerativeModel.generateContent()](./vertexai.generativemodel.md#generativemodelgeneratecontent) and [GenerativeModel.generateContentStream()](./vertexai.generativemodel.md#generativemodelgeneratecontentstream)<!-- -->. <code>generateContentStream()</code> will return one in each chunk until the stream is done. |
|  [GenerateContentResult](./vertexai.generatecontentresult.md#generatecontentresult_interface) | Result object returned from [GenerativeModel.generateContent()](./vertexai.generativemodel.md#generativemodelgeneratecontent) call. |
|  [GenerateContentStreamResult](./vertexai.generatecontentstreamresult.md#generatecontentstreamresult_interface) | Result object returned from [GenerativeModel.generateContentStream()](./vertexai.generativemodel.md#generativemodelgeneratecontentstream) call. Iterate over <code>stream</code> to get chunks as they come in and/or use the <code>response</code> promise to get the aggregated response when the stream is done. |
|  [GenerationConfig](./vertexai.generationconfig.md#generationconfig_interface) | Config options for content-related requests |
|  [GenerativeContentBlob](./vertexai.generativecontentblob.md#generativecontentblob_interface) | Interface for sending an image. |
|  [GroundingAttribution](./vertexai.groundingattribution.md#groundingattribution_interface) |  |
|  [GroundingMetadata](./vertexai.groundingmetadata.md#groundingmetadata_interface) | Metadata returned to client when grounding is enabled. |
|  [ImagenGCSImage](./vertexai.imagengcsimage.md#imagengcsimage_interface) | An image generated by Imagen, stored in a Cloud Storage for Firebase bucket.<!-- -->This feature is not available yet. |
|  [ImagenGenerationConfig](./vertexai.imagengenerationconfig.md#imagengenerationconfig_interface) | <b><i>(Public Preview)</i></b> Configuration options for generating images with Imagen.<!-- -->See the [documentation](http://firebase.google.com/docs/vertex-ai/generate-images-imagen) for more details. |
|  [ImagenGenerationResponse](./vertexai.imagengenerationresponse.md#imagengenerationresponse_interface) | <b><i>(Public Preview)</i></b> The response from a request to generate images with Imagen. |
|  [ImagenInlineImage](./vertexai.imageninlineimage.md#imageninlineimage_interface) | <b><i>(Public Preview)</i></b> An image generated by Imagen, represented as inline data. |
|  [ImagenModelParams](./vertexai.imagenmodelparams.md#imagenmodelparams_interface) | <b><i>(Public Preview)</i></b> Parameters for configuring an [ImagenModel](./vertexai.imagenmodel.md#imagenmodel_class)<!-- -->. |
|  [ImagenSafetySettings](./vertexai.imagensafetysettings.md#imagensafetysettings_interface) | <b><i>(Public Preview)</i></b> Settings for controlling the aggressiveness of filtering out sensitive content.<!-- -->See the [documentation](http://firebase.google.com/docs/vertex-ai/generate-images) for more details. |
|  [InlineDataPart](./vertexai.inlinedatapart.md#inlinedatapart_interface) | Content part interface if the part represents an image. |
|  [ModalityTokenCount](./vertexai.modalitytokencount.md#modalitytokencount_interface) | Represents token counting info for a single modality. |
|  [ModelParams](./vertexai.modelparams.md#modelparams_interface) | Params passed to [getGenerativeModel()](./vertexai.md#getgenerativemodel_e3037c9)<!-- -->. |
|  [ObjectSchemaInterface](./vertexai.objectschemainterface.md#objectschemainterface_interface) | Interface for [ObjectSchema](./vertexai.objectschema.md#objectschema_class) class. |
|  [PromptFeedback](./vertexai.promptfeedback.md#promptfeedback_interface) | If the prompt was blocked, this will be populated with <code>blockReason</code> and the relevant <code>safetyRatings</code>. |
|  [RequestOptions](./vertexai.requestoptions.md#requestoptions_interface) | Params passed to [getGenerativeModel()](./vertexai.md#getgenerativemodel_e3037c9)<!-- -->. |
|  [RetrievedContextAttribution](./vertexai.retrievedcontextattribution.md#retrievedcontextattribution_interface) |  |
|  [SafetyRating](./vertexai.safetyrating.md#safetyrating_interface) | A safety rating associated with a [GenerateContentCandidate](./vertexai.generatecontentcandidate.md#generatecontentcandidate_interface) |
|  [SafetySetting](./vertexai.safetysetting.md#safetysetting_interface) | Safety setting that can be sent as part of request parameters. |
|  [SchemaInterface](./vertexai.schemainterface.md#schemainterface_interface) | Interface for [Schema](./vertexai.schema.md#schema_class) class. |
|  [SchemaParams](./vertexai.schemaparams.md#schemaparams_interface) | Params passed to [Schema](./vertexai.schema.md#schema_class) static methods to create specific [Schema](./vertexai.schema.md#schema_class) classes. |
|  [SchemaRequest](./vertexai.schemarequest.md#schemarequest_interface) | Final format for [Schema](./vertexai.schema.md#schema_class) params passed to backend requests. |
|  [SchemaShared](./vertexai.schemashared.md#schemashared_interface) | Basic [Schema](./vertexai.schema.md#schema_class) properties shared across several Schema-related types. |
|  [Segment](./vertexai.segment.md#segment_interface) |  |
|  [StartChatParams](./vertexai.startchatparams.md#startchatparams_interface) | Params for [GenerativeModel.startChat()](./vertexai.generativemodel.md#generativemodelstartchat)<!-- -->. |
|  [TextPart](./vertexai.textpart.md#textpart_interface) | Content part interface if the part represents a text string. |
|  [ToolConfig](./vertexai.toolconfig.md#toolconfig_interface) | Tool config. This config is shared for all tools provided in the request. |
|  [UsageMetadata](./vertexai.usagemetadata.md#usagemetadata_interface) | Usage metadata about a [GenerateContentResponse](./vertexai.generatecontentresponse.md#generatecontentresponse_interface)<!-- -->. |
|  [VertexAI](./vertexai.vertexai.md#vertexai_interface) | An instance of the Vertex AI in Firebase SDK. |
|  [VertexAIOptions](./vertexai.vertexaioptions.md#vertexaioptions_interface) | Options when initializing the Vertex AI in Firebase SDK. |
|  [VideoMetadata](./vertexai.videometadata.md#videometadata_interface) | Describes the input video content. |
|  [WebAttribution](./vertexai.webattribution.md#webattribution_interface) |  |

## Variables

|  Variable | Description |
|  --- | --- |
|  [POSSIBLE\_ROLES](./vertexai.md#possible_roles) | Possible roles. |

## Type Aliases

|  Type Alias | Description |
|  --- | --- |
|  [Part](./vertexai.md#part) | Content part - includes text, image/video, or function call/response part types. |
|  [Role](./vertexai.md#role) | Role is the producer of the content. |
|  [Tool](./vertexai.md#tool) | Defines a tool that model can call to access external knowledge. |
|  [TypedSchema](./vertexai.md#typedschema) | A type that includes all specific Schema types. |

## function(app, ...)

### getVertexAI(app, options) {:#getvertexai_04094cf}

Returns a [VertexAI](./vertexai.vertexai.md#vertexai_interface) instance for the given app.

<b>Signature:</b>

```typescript
export declare function getVertexAI(app?: FirebaseApp, options?: VertexAIOptions): VertexAI;
```

#### Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  app | [FirebaseApp](./app.firebaseapp.md#firebaseapp_interface) | The [FirebaseApp](./app.firebaseapp.md#firebaseapp_interface) to use. |
|  options | [VertexAIOptions](./vertexai.vertexaioptions.md#vertexaioptions_interface) |  |

<b>Returns:</b>

[VertexAI](./vertexai.vertexai.md#vertexai_interface)

## function(vertexAI, ...)

### getGenerativeModel(vertexAI, modelParams, requestOptions) {:#getgenerativemodel_e3037c9}

Returns a [GenerativeModel](./vertexai.generativemodel.md#generativemodel_class) class with methods for inference and other functionality.

<b>Signature:</b>

```typescript
export declare function getGenerativeModel(vertexAI: VertexAI, modelParams: ModelParams, requestOptions?: RequestOptions): GenerativeModel;
```

#### Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  vertexAI | [VertexAI](./vertexai.vertexai.md#vertexai_interface) |  |
|  modelParams | [ModelParams](./vertexai.modelparams.md#modelparams_interface) |  |
|  requestOptions | [RequestOptions](./vertexai.requestoptions.md#requestoptions_interface) |  |

<b>Returns:</b>

[GenerativeModel](./vertexai.generativemodel.md#generativemodel_class)

### getImagenModel(vertexAI, modelParams, requestOptions) {:#getimagenmodel_812c375}

> This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.
> 

Returns an [ImagenModel](./vertexai.imagenmodel.md#imagenmodel_class) class with methods for using Imagen.

Only Imagen 3 models (named `imagen-3.0-*`<!-- -->) are supported.

<b>Signature:</b>

```typescript
export declare function getImagenModel(vertexAI: VertexAI, modelParams: ImagenModelParams, requestOptions?: RequestOptions): ImagenModel;
```

#### Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  vertexAI | [VertexAI](./vertexai.vertexai.md#vertexai_interface) | An instance of the Vertex AI in Firebase SDK. |
|  modelParams | [ImagenModelParams](./vertexai.imagenmodelparams.md#imagenmodelparams_interface) | Parameters to use when making Imagen requests. |
|  requestOptions | [RequestOptions](./vertexai.requestoptions.md#requestoptions_interface) | Additional options to use when making requests. |

<b>Returns:</b>

[ImagenModel](./vertexai.imagenmodel.md#imagenmodel_class)

#### Exceptions

If the `apiKey` or `projectId` fields are missing in your Firebase config.

## POSSIBLE\_ROLES

Possible roles.

<b>Signature:</b>

```typescript
POSSIBLE_ROLES: readonly ["user", "model", "function", "system"]
```

## Part

Content part - includes text, image/video, or function call/response part types.

<b>Signature:</b>

```typescript
export type Part = TextPart | InlineDataPart | FunctionCallPart | FunctionResponsePart | FileDataPart;
```

## Role

Role is the producer of the content.

<b>Signature:</b>

```typescript
export type Role = (typeof POSSIBLE_ROLES)[number];
```

## Tool

Defines a tool that model can call to access external knowledge.

<b>Signature:</b>

```typescript
export declare type Tool = FunctionDeclarationsTool;
```

## TypedSchema

A type that includes all specific Schema types.

<b>Signature:</b>

```typescript
export type TypedSchema = IntegerSchema | NumberSchema | StringSchema | BooleanSchema | ObjectSchema | ArraySchema;
```

## BlockReason

Reason that a prompt was blocked.

<b>Signature:</b>

```typescript
export declare enum BlockReason 
```

## Enumeration Members

|  Member | Value | Description |
|  --- | --- | --- |
|  BLOCKLIST | <code>&quot;BLOCKLIST&quot;</code> | Content was blocked because it contained terms from the terminology blocklist. |
|  OTHER | <code>&quot;OTHER&quot;</code> | Content was blocked, but the reason is uncategorized. |
|  PROHIBITED\_CONTENT | <code>&quot;PROHIBITED_CONTENT&quot;</code> | Content was blocked due to prohibited content. |
|  SAFETY | <code>&quot;SAFETY&quot;</code> | Content was blocked by safety settings. |

## FinishReason

Reason that a candidate finished.

<b>Signature:</b>

```typescript
export declare enum FinishReason 
```

## Enumeration Members

|  Member | Value | Description |
|  --- | --- | --- |
|  BLOCKLIST | <code>&quot;BLOCKLIST&quot;</code> | The candidate content contained forbidden terms. |
|  MALFORMED\_FUNCTION\_CALL | <code>&quot;MALFORMED_FUNCTION_CALL&quot;</code> | The function call generated by the model was invalid. |
|  MAX\_TOKENS | <code>&quot;MAX_TOKENS&quot;</code> | The maximum number of tokens as specified in the request was reached. |
|  OTHER | <code>&quot;OTHER&quot;</code> | Unknown reason. |
|  PROHIBITED\_CONTENT | <code>&quot;PROHIBITED_CONTENT&quot;</code> | The candidate content potentially contained prohibited content. |
|  RECITATION | <code>&quot;RECITATION&quot;</code> | The candidate content was flagged for recitation reasons. |
|  SAFETY | <code>&quot;SAFETY&quot;</code> | The candidate content was flagged for safety reasons. |
|  SPII | <code>&quot;SPII&quot;</code> | The candidate content potentially contained Sensitive Personally Identifiable Information (SPII). |
|  STOP | <code>&quot;STOP&quot;</code> | Natural stop point of the model or provided stop sequence. |

## FunctionCallingMode


<b>Signature:</b>

```typescript
export declare enum FunctionCallingMode 
```

## Enumeration Members

|  Member | Value | Description |
|  --- | --- | --- |
|  ANY | <code>&quot;ANY&quot;</code> | Model is constrained to always predicting a function call only. If <code>allowed_function_names</code> is set, the predicted function call will be limited to any one of <code>allowed_function_names</code>, else the predicted function call will be any one of the provided <code>function_declarations</code>. |
|  AUTO | <code>&quot;AUTO&quot;</code> | Default model behavior; model decides to predict either a function call or a natural language response. |
|  NONE | <code>&quot;NONE&quot;</code> | Model will not predict any function call. Model behavior is same as when not passing any function declarations. |

## HarmBlockMethod


<b>Signature:</b>

```typescript
export declare enum HarmBlockMethod 
```

## Enumeration Members

|  Member | Value | Description |
|  --- | --- | --- |
|  PROBABILITY | <code>&quot;PROBABILITY&quot;</code> | The harm block method uses the probability score. |
|  SEVERITY | <code>&quot;SEVERITY&quot;</code> | The harm block method uses both probability and severity scores. |

## HarmBlockThreshold

Threshold above which a prompt or candidate will be blocked.

<b>Signature:</b>

```typescript
export declare enum HarmBlockThreshold 
```

## Enumeration Members

|  Member | Value | Description |
|  --- | --- | --- |
|  BLOCK\_LOW\_AND\_ABOVE | <code>&quot;BLOCK_LOW_AND_ABOVE&quot;</code> | Content with <code>NEGLIGIBLE</code> will be allowed. |
|  BLOCK\_MEDIUM\_AND\_ABOVE | <code>&quot;BLOCK_MEDIUM_AND_ABOVE&quot;</code> | Content with <code>NEGLIGIBLE</code> and <code>LOW</code> will be allowed. |
|  BLOCK\_NONE | <code>&quot;BLOCK_NONE&quot;</code> | All content will be allowed. |
|  BLOCK\_ONLY\_HIGH | <code>&quot;BLOCK_ONLY_HIGH&quot;</code> | Content with <code>NEGLIGIBLE</code>, <code>LOW</code>, and <code>MEDIUM</code> will be allowed. |

## HarmCategory

Harm categories that would cause prompts or candidates to be blocked.

<b>Signature:</b>

```typescript
export declare enum HarmCategory 
```

## Enumeration Members

|  Member | Value | Description |
|  --- | --- | --- |
|  HARM\_CATEGORY\_DANGEROUS\_CONTENT | <code>&quot;HARM_CATEGORY_DANGEROUS_CONTENT&quot;</code> |  |
|  HARM\_CATEGORY\_HARASSMENT | <code>&quot;HARM_CATEGORY_HARASSMENT&quot;</code> |  |
|  HARM\_CATEGORY\_HATE\_SPEECH | <code>&quot;HARM_CATEGORY_HATE_SPEECH&quot;</code> |  |
|  HARM\_CATEGORY\_SEXUALLY\_EXPLICIT | <code>&quot;HARM_CATEGORY_SEXUALLY_EXPLICIT&quot;</code> |  |

## HarmProbability

Probability that a prompt or candidate matches a harm category.

<b>Signature:</b>

```typescript
export declare enum HarmProbability 
```

## Enumeration Members

|  Member | Value | Description |
|  --- | --- | --- |
|  HIGH | <code>&quot;HIGH&quot;</code> | Content has a high chance of being unsafe. |
|  LOW | <code>&quot;LOW&quot;</code> | Content has a low chance of being unsafe. |
|  MEDIUM | <code>&quot;MEDIUM&quot;</code> | Content has a medium chance of being unsafe. |
|  NEGLIGIBLE | <code>&quot;NEGLIGIBLE&quot;</code> | Content has a negligible chance of being unsafe. |

## HarmSeverity

Harm severity levels.

<b>Signature:</b>

```typescript
export declare enum HarmSeverity 
```

## Enumeration Members

|  Member | Value | Description |
|  --- | --- | --- |
|  HARM\_SEVERITY\_HIGH | <code>&quot;HARM_SEVERITY_HIGH&quot;</code> | High level of harm severity. |
|  HARM\_SEVERITY\_LOW | <code>&quot;HARM_SEVERITY_LOW&quot;</code> | Low level of harm severity. |
|  HARM\_SEVERITY\_MEDIUM | <code>&quot;HARM_SEVERITY_MEDIUM&quot;</code> | Medium level of harm severity. |
|  HARM\_SEVERITY\_NEGLIGIBLE | <code>&quot;HARM_SEVERITY_NEGLIGIBLE&quot;</code> | Negligible level of harm severity. |

## ImagenAspectRatio

> This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.
> 

Aspect ratios for Imagen images.

To specify an aspect ratio for generated images, set the `aspectRatio` property in your [ImagenGenerationConfig](./vertexai.imagengenerationconfig.md#imagengenerationconfig_interface)<!-- -->.

See the the [documentation](http://firebase.google.com/docs/vertex-ai/generate-images) for more details and examples of the supported aspect ratios.

<b>Signature:</b>

```typescript
export declare enum ImagenAspectRatio 
```

## Enumeration Members

|  Member | Value | Description |
|  --- | --- | --- |
|  LANDSCAPE\_16x9 | <code>&quot;16:9&quot;</code> | <b><i>(Public Preview)</i></b> Landscape (16:9) aspect ratio. |
|  LANDSCAPE\_3x4 | <code>&quot;3:4&quot;</code> | <b><i>(Public Preview)</i></b> Landscape (3:4) aspect ratio. |
|  PORTRAIT\_4x3 | <code>&quot;4:3&quot;</code> | <b><i>(Public Preview)</i></b> Portrait (4:3) aspect ratio. |
|  PORTRAIT\_9x16 | <code>&quot;9:16&quot;</code> | <b><i>(Public Preview)</i></b> Portrait (9:16) aspect ratio. |
|  SQUARE | <code>&quot;1:1&quot;</code> | <b><i>(Public Preview)</i></b> Square (1:1) aspect ratio. |

## ImagenPersonFilterLevel

> This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.
> 

A filter level controlling whether generation of images containing people or faces is allowed.

See the <a href="http://firebase.google.com/docs/vertex-ai/generate-images">personGeneration</a> documentation for more details.

<b>Signature:</b>

```typescript
export declare enum ImagenPersonFilterLevel 
```

## Enumeration Members

|  Member | Value | Description |
|  --- | --- | --- |
|  ALLOW\_ADULT | <code>&quot;allow_adult&quot;</code> | <b><i>(Public Preview)</i></b> Allow generation of images containing adults only; images of children are filtered out.<!-- -->Generation of images containing people or faces may require your use case to be reviewed and approved by Cloud support; see the [Responsible AI and usage guidelines](https://cloud.google.com/vertex-ai/generative-ai/docs/image/responsible-ai-imagen#person-face-gen) for more details. |
|  ALLOW\_ALL | <code>&quot;allow_all&quot;</code> | <b><i>(Public Preview)</i></b> Allow generation of images containing adults only; images of children are filtered out.<!-- -->Generation of images containing people or faces may require your use case to be reviewed and approved by Cloud support; see the [Responsible AI and usage guidelines](https://cloud.google.com/vertex-ai/generative-ai/docs/image/responsible-ai-imagen#person-face-gen) for more details. |
|  BLOCK\_ALL | <code>&quot;dont_allow&quot;</code> | <b><i>(Public Preview)</i></b> Disallow generation of images containing people or faces; images of people are filtered out. |

## ImagenSafetyFilterLevel

> This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.
> 

A filter level controlling how aggressively to filter sensitive content.

Text prompts provided as inputs and images (generated or uploaded) through Imagen on Vertex AI are assessed against a list of safety filters, which include 'harmful categories' (for example, `violence`<!-- -->, `sexual`<!-- -->, `derogatory`<!-- -->, and `toxic`<!-- -->). This filter level controls how aggressively to filter out potentially harmful content from responses. See the [documentation](http://firebase.google.com/docs/vertex-ai/generate-images) and the [Responsible AI and usage guidelines](https://cloud.google.com/vertex-ai/generative-ai/docs/image/responsible-ai-imagen#safety-filters) for more details.

<b>Signature:</b>

```typescript
export declare enum ImagenSafetyFilterLevel 
```

## Enumeration Members

|  Member | Value | Description |
|  --- | --- | --- |
|  BLOCK\_LOW\_AND\_ABOVE | <code>&quot;block_low_and_above&quot;</code> | <b><i>(Public Preview)</i></b> The most aggressive filtering level; most strict blocking. |
|  BLOCK\_MEDIUM\_AND\_ABOVE | <code>&quot;block_medium_and_above&quot;</code> | <b><i>(Public Preview)</i></b> Blocks some sensitive prompts and responses. |
|  BLOCK\_NONE | <code>&quot;block_none&quot;</code> | <b><i>(Public Preview)</i></b> The least aggressive filtering level; blocks very few sensitive prompts and responses.<!-- -->Access to this feature is restricted and may require your case to be reviewed and approved by Cloud support. |
|  BLOCK\_ONLY\_HIGH | <code>&quot;block_only_high&quot;</code> | <b><i>(Public Preview)</i></b> Blocks few sensitive prompts and responses. |

## Modality

Content part modality.

<b>Signature:</b>

```typescript
export declare enum Modality 
```

## Enumeration Members

|  Member | Value | Description |
|  --- | --- | --- |
|  AUDIO | <code>&quot;AUDIO&quot;</code> | Audio. |
|  DOCUMENT | <code>&quot;DOCUMENT&quot;</code> | Document (for example, PDF). |
|  IMAGE | <code>&quot;IMAGE&quot;</code> | Image. |
|  MODALITY\_UNSPECIFIED | <code>&quot;MODALITY_UNSPECIFIED&quot;</code> | Unspecified modality. |
|  TEXT | <code>&quot;TEXT&quot;</code> | Plain text. |
|  VIDEO | <code>&quot;VIDEO&quot;</code> | Video. |

## SchemaType

Contains the list of OpenAPI data types as defined by the [OpenAPI specification](https://swagger.io/docs/specification/data-models/data-types/)

<b>Signature:</b>

```typescript
export declare enum SchemaType 
```

## Enumeration Members

|  Member | Value | Description |
|  --- | --- | --- |
|  ARRAY | <code>&quot;array&quot;</code> | Array type. |
|  BOOLEAN | <code>&quot;boolean&quot;</code> | Boolean type. |
|  INTEGER | <code>&quot;integer&quot;</code> | Integer type. |
|  NUMBER | <code>&quot;number&quot;</code> | Number type. |
|  OBJECT | <code>&quot;object&quot;</code> | Object type. |
|  STRING | <code>&quot;string&quot;</code> | String type. |

## VertexAIErrorCode

Standardized error codes that [VertexAIError](./vertexai.vertexaierror.md#vertexaierror_class) can have.

<b>Signature:</b>

```typescript
export declare const enum VertexAIErrorCode 
```

## Enumeration Members

|  Member | Value | Description |
|  --- | --- | --- |
|  API\_NOT\_ENABLED | <code>&quot;api-not-enabled&quot;</code> | An error due to the Firebase API not being enabled in the Console. |
|  ERROR | <code>&quot;error&quot;</code> | A generic error occurred. |
|  FETCH\_ERROR | <code>&quot;fetch-error&quot;</code> | An error occurred while performing a fetch. |
|  INVALID\_CONTENT | <code>&quot;invalid-content&quot;</code> | An error associated with a Content object. |
|  INVALID\_SCHEMA | <code>&quot;invalid-schema&quot;</code> | An error due to invalid Schema input. |
|  NO\_API\_KEY | <code>&quot;no-api-key&quot;</code> | An error occurred due to a missing Firebase API key. |
|  NO\_APP\_ID | <code>&quot;no-app-id&quot;</code> | An error occured due to a missing Firebase app ID. |
|  NO\_MODEL | <code>&quot;no-model&quot;</code> | An error occurred due to a model name not being specified during initialization. |
|  NO\_PROJECT\_ID | <code>&quot;no-project-id&quot;</code> | An error occurred due to a missing project ID. |
|  PARSE\_FAILED | <code>&quot;parse-failed&quot;</code> | An error occurred while parsing. |
|  REQUEST\_ERROR | <code>&quot;request-error&quot;</code> | An error occurred in a request. |
|  RESPONSE\_ERROR | <code>&quot;response-error&quot;</code> | An error occurred in a response. |

