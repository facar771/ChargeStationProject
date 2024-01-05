package station.chargeStation.webApi.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import station.chargeStation.business.abstracts.ReservationService;
import station.chargeStation.dataAccess.abstracts.UserRepository;
import station.chargeStation.entities.concretes.Reservation;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {
	private ReservationService reservationService;
	UserRepository userRepository;
	
	public ReservationController (ReservationService reservationService, UserRepository userRepository) {
		this.reservationService = reservationService;
		this.userRepository = userRepository;
	}
	
	@PostMapping("/postreservation")
	public String postStationReservation(@RequestBody Reservation reservation) {
		return reservationService.postStationReservation(reservation);
	}
	
	@PostMapping("/listreservations")
	public List<Reservation> reservastionList(int userId) {
		return reservationService.reservastionList(userId);
	}
	
	@PostMapping("/liststationreservations")
	public List<Reservation> stationReservastionList(int stationId) {
		return reservationService.stationReservastionList(stationId);
	}
	
	@DeleteMapping("/reservationdelete")
	public String reservationDelete(Integer  reservationId) {
		return reservationService.reservationDelete(reservationId);
	}
}






