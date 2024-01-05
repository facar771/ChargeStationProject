package station.chargeStation.business.abstracts;

import java.util.List;

import station.chargeStation.entities.concretes.Reservation;

public interface ReservationService {
	void add(Reservation reservation);
	public List<Reservation> reservastionList(int userId);
	public List<Reservation> stationReservastionList(int stationId);
	public String postStationReservation( Reservation reservation);
	public String reservationDelete(int reservationId);
}
