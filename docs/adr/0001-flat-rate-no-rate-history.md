# Flat Rate, no rate history

Cost is derived by applying a single current Rate uniformly to all Consumption history, rather than modeling time-of-use pricing or a Rate that changes over time. We considered tracking Rate changes with effective dates, and ingesting actual billed Cost from utility invoices instead of deriving it, but both add a second temporal or data-ingestion model before the core Consumption-and-Cost trend loop is proven. The trade-off: Cost trends spanning a real-world rate change will be inaccurate until this is revisited.
