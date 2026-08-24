# GreenOps

GreenOps is a building-energy intelligence application. It turns a Building's Meter data into Consumption and Cost trends so an Analyst can understand and report on energy performance.

## Language

**Analyst**:
The user of GreenOps — a sustainability/ESG professional responsible for understanding and reporting on a Building's energy performance.
_Avoid_: User, account

**Building**:
The physical facility whose electricity Consumption GreenOps tracks. The unit everything else (Meter, Consumption, Rate) is scoped to.
_Avoid_: Site, facility, property

**Meter**:
The point of measurement that records a Building's electricity Consumption over time.
_Avoid_: Sensor, device

**Interval Reading**:
A single Consumption measurement recorded by a Meter for one fixed time interval (e.g. 15 minutes).
_Avoid_: Data point, sample, record

**Consumption**:
The quantity of electricity used by a Building, measured in kWh, built up from Interval Readings.
_Avoid_: Usage, load

**Rate**:
The price per kWh applied to Consumption to derive Cost.
_Avoid_: Tariff, price

**Cost**:
The monetary amount derived by applying the Rate to Consumption. Distinct from a billed amount on a utility invoice, which GreenOps does not ingest.
_Avoid_: Bill, charge

**Period**:
A defined calendar span (day or month) over which Consumption and Cost are rolled up and compared.
_Avoid_: Range, window

**Incomplete Period**:
A Period for which at least one expected Interval Reading is missing, including a Period still in progress (it hasn't yet reached the readings expected for its full calendar span). Flagged rather than estimated or silently excluded, and never used in a Period-over-Period comparison until both Periods are complete.
_Avoid_: Partial period, gap
